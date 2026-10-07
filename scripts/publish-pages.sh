#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"

branch_name="$(git branch --show-current)"
if [[ -z "$branch_name" || "$branch_name" == "main" || "$branch_name" == "gh-pages" ]]; then
  printf '%s\n' 'Run this command from a committed feature branch, not main or gh-pages.' >&2
  exit 1
fi
if [[ -n "$(git status --porcelain)" ]]; then
  printf '%s\n' 'Commit your source changes before publishing.' >&2
  exit 1
fi

source_commit="$(git rev-parse HEAD)"
origin_url="$(git remote get-url origin)"
author_name="$(git config user.name)"
author_email="$(git config user.email)"
npm test
npm run build

# This is a separate temporary checkout, not a worktree. Build outputs stay
# ignored in the source checkout; only deployable root files enter gh-pages.
publish_dir="$(mktemp -d /tmp/todays-creature-pages.XXXXXX)"
trap 'rm -rf -- "$publish_dir"' EXIT
git -C "$publish_dir" init --quiet --initial-branch=gh-pages
git -C "$publish_dir" config user.name "$author_name"
git -C "$publish_dir" config user.email "$author_email"
git -C "$publish_dir" remote add origin "$origin_url"

remote_ref="$(git -C "$project_dir" ls-remote --heads origin refs/heads/gh-pages)"
if [[ -n "$remote_ref" ]]; then
  git -C "$publish_dir" fetch --quiet --depth=1 origin gh-pages
  git -C "$publish_dir" checkout --quiet -B gh-pages FETCH_HEAD
  if [[ ! -f "$publish_dir/.todays-creature-pages" ]]; then
    printf '%s\n' 'An unrelated gh-pages site already exists. It was left unchanged.' >&2
    exit 1
  fi
  git -C "$publish_dir" rm -r --quiet --ignore-unmatch .
fi

cp -R "$project_dir/dist/." "$publish_dir/"
cp "$project_dir/.gitignore" "$publish_dir/.gitignore"
touch "$publish_dir/.nojekyll"
printf '%s\n' "Today's Creature static site" > "$publish_dir/.todays-creature-pages"
printf '%s\n' "$source_commit" > "$publish_dir/source-commit.txt"
git -C "$publish_dir" add --all
if git -C "$publish_dir" diff --cached --quiet; then
  printf '%s\n' 'The same source commit is already published; no new commit needed.'
  exit 0
fi
git -C "$publish_dir" diff --cached --check
git -C "$publish_dir" commit --quiet -m "Publish Today's Creature from ${source_commit:0:7}"
# No force push: a concurrent update is rejected rather than overwritten.
git -C "$publish_dir" push origin HEAD:refs/heads/gh-pages
printf '%s\n' 'Web files are on gh-pages. In repository Settings → Pages, select Deploy from a branch → gh-pages → / (root) → Save.'
printf '%s\n' 'A successful push does not itself prove Pages is enabled or deployment has completed.'
