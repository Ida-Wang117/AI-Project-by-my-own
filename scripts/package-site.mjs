import { execFileSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
let sourceDir = join(projectDir, "dist");
if (args.length === 2 && args[0] === "--dist") {
  sourceDir = resolve(args[1]);
} else if (args.length) {
  console.error(
    "Usage: node scripts/package-site.mjs [--dist <built-site-directory>]",
  );
  process.exit(1);
}

const output = "/tmp/todays-creature-site.zip";
const stagingDir = mkdtempSync(join(tmpdir(), "todays-creature-package-"));
const tempOutput = join(stagingDir, "site.zip");
const payloadDir = join(stagingDir, "site");
const deniedValues = new Set(["ida-wang117"]);
const allowedExtensions = new Set([
  ".html",
  ".js",
  ".css",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".ico",
  ".gif",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".txt",
  ".json",
]);
const textExtensions = new Set([
  ".html",
  ".js",
  ".css",
  ".svg",
  ".txt",
  ".json",
]);
const credentialPatterns = [
  /-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----/i,
  /\b(?:gh[pousr]_[a-z0-9]{20,}|github_pat_[a-z0-9_]{20,}|sk-[a-z0-9_-]{20,}|AKIA[A-Z0-9]{16})\b/i,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
];

// Read Git metadata only to identify private attribution. Never log values or
// inspect credential/environment files. The ZIP contains none of this metadata.
function gitValue(...arguments_) {
  try {
    return execFileSync("git", ["-C", projectDir, ...arguments_], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

for (const field of ["user.name", "user.email"]) {
  const value = gitValue("config", "--get", field);
  if (value.length >= 3) deniedValues.add(value.toLowerCase());
}
const origin = gitValue("remote", "get-url", "origin");
const repositoryPath = origin.match(
  /(?:github\.com[/:]|\/github\.com\/)([^/?#]+)\/([^/?#]+?)(?:\.git)?(?:[?#].*)?$/i,
);
if (repositoryPath) {
  const [, account, repository] = repositoryPath;
  deniedValues.add(account.toLowerCase());
  deniedValues.add(`${account}/${repository}`.toLowerCase());
  deniedValues.add(`github.com/${account}/${repository}`.toLowerCase());
  deniedValues.add(`${account}.github.io`.toLowerCase());
}

function checkPrivacy(text, relativePath) {
  const lowerText = text.toLowerCase();
  if ([...deniedValues].some((value) => lowerText.includes(value))) {
    throw new Error(
      `Privacy check failed in ${relativePath}: personal attribution or repository URL detected. Remove it from the public build and rebuild.`,
    );
  }
  if (credentialPatterns.some((pattern) => pattern.test(text))) {
    throw new Error(
      `Privacy check failed in ${relativePath}: an email address or credential-like content was detected. Review the public build; values were not printed.`,
    );
  }
}

let count = 0;
function collect(directory, relativeDirectory = "") {
  for (const name of readdirSync(directory).sort()) {
    // Defense in depth: only app output enters the archive, never deployment
    // metadata, dotfiles, credentials, source maps, or the surrounding checkout.
    if (
      name.startsWith(".") ||
      /^source-commit(?:\.|$)/i.test(name) ||
      /\.map$/i.test(name)
    )
      continue;
    const relativePath = relativeDirectory
      ? `${relativeDirectory}/${name}`
      : name;
    checkPrivacy(relativePath, "a build filename");
    const filePath = join(directory, name);
    const stat = lstatSync(filePath);
    if (stat.isSymbolicLink())
      throw new Error(`Refusing a symbolic link in the build: ${relativePath}`);
    if (stat.isDirectory()) {
      collect(filePath, relativePath);
      continue;
    }
    if (!stat.isFile() || !allowedExtensions.has(extname(name).toLowerCase())) {
      throw new Error(
        `Unexpected build file: ${relativePath}. Only static website assets are allowed.`,
      );
    }
    const bytes = readFileSync(filePath);
    let content;
    try {
      content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      if (textExtensions.has(extname(name).toLowerCase())) {
        throw new Error(`Cannot privacy-check a text asset: ${relativePath}`);
      }
    }
    if (content !== undefined) checkPrivacy(content, relativePath);
    if (content && /sourceMappingURL\s*=\s*data:/i.test(content)) {
      throw new Error(
        `Inline source map found in ${relativePath}; rebuild without source maps before packaging.`,
      );
    }
    const destination = join(payloadDir, relativePath);
    mkdirSync(dirname(destination), { recursive: true });
    // Snapshot the checked bytes so the ZIP cannot change if another build runs.
    writeFileSync(destination, bytes);
    count += 1;
  }
}

try {
  // Remove an earlier generated ZIP so a failed privacy check cannot leave a
  // stale artifact looking like the current successful package.
  rmSync(output, { force: true });
  if (!existsSync(join(sourceDir, "index.html"))) {
    throw new Error(
      "A root index.html was not found. Run npm run build first.",
    );
  }
  collect(sourceDir);
  execFileSync(
    "python3",
    [
      "-c",
      String.raw`
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
import sys

source = Path(sys.argv[1])
with ZipFile(sys.argv[2], "w", compression=ZIP_DEFLATED) as archive:
    for path in sorted(source.rglob("*")):
        if path.is_file():
            archive.write(path, path.relative_to(source).as_posix())
    if "index.html" not in archive.namelist():
        raise RuntimeError("ZIP must contain index.html at its root")
`,
      payloadDir,
      tempOutput,
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  renameSync(tempOutput, output);
  console.log(
    `Privacy checks passed. Packaged ${count} static files: ${output}`,
  );
  console.log(
    "Upload this ZIP with Cloudflare Pages Direct Upload; use the actual URL returned by Cloudflare.",
  );
} catch (error) {
  console.error(
    error instanceof Error ? error.message : "Website packaging failed.",
  );
  process.exitCode = 1;
} finally {
  rmSync(stagingDir, { recursive: true, force: true });
}
