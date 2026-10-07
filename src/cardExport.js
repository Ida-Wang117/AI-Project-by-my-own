const ink = "#20231f";
const paper = "#f1f0e8";

const copy = {
  zh: {
    brand: "今日物种 / 状态工牌",
    validity: "有效期：近两周",
    opinion: "本窗口意见",
    footer: "仅作状态嘴替，不作绩效证明。禁止用于自我整改大会。",
  },
  en: {
    brand: "TODAY'S CREATURE / STATUS BADGE",
    validity: "BASED ON THE LAST TWO WEEKS",
    opinion: "DESK'S TAKE",
    footer:
      "A voice for your current state, not a performance review. No self-fix meetings required.",
  },
};

const graphemeSegmenter =
  typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function characters(text) {
  return graphemeSegmenter
    ? Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment)
    : Array.from(text);
}

function setFont(ctx, size, bold = false, family = "sans-serif") {
  ctx.font = `${bold ? "bold " : ""}${size}px ${family}`;
}

// Keep English words together; CJK characters and oversized words may wrap.
function wrapLines(ctx, text, width) {
  const lines = [];
  for (const paragraph of String(text ?? "").split(/\r?\n/)) {
    const tokens =
      paragraph.match(
        /\s+|[\u2e80-\u9fff\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]|[^\s\u2e80-\u9fff\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]+/gu,
      ) || [];
    let line = "";
    let space = "";
    for (const token of tokens) {
      if (/^\s+$/u.test(token)) {
        space = line ? token : "";
        continue;
      }
      if (ctx.measureText(line + space + token).width <= width) {
        line += space + token;
        space = "";
        continue;
      }
      if (line) lines.push(line);
      line = "";
      space = "";
      for (const character of characters(token)) {
        if (line && ctx.measureText(line + character).width > width) {
          lines.push(line);
          line = "";
        }
        line += character;
      }
    }
    lines.push(line);
  }
  return lines;
}

function writeLines(ctx, lines, { x, y, lineHeight }) {
  for (const line of lines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

function fittedFont(
  ctx,
  text,
  width,
  maxSize,
  bold = false,
  family = "sans-serif",
) {
  setFont(ctx, maxSize, bold, family);
  const measured = ctx.measureText(text).width;
  const size = measured > width ? (maxSize * width) / measured : maxSize;
  setFont(ctx, size, bold, family);
  return size;
}

function shortenLines(ctx, lines, maxLines, width) {
  if (lines.length <= maxLines) return lines;
  const result = lines.slice(0, maxLines);
  const last = characters(result.at(-1));
  while (last.length && ctx.measureText(last.join("") + "…").width > width)
    last.pop();
  result[result.length - 1] = last.join("") + "…";
  return result;
}

function bodyLayout(ctx, role, top, width, bottom) {
  let layout;
  for (let step = 0; step <= 14; step += 1) {
    const scale = 1 - step * 0.02;
    const roastSize = 33 * scale;
    const comfortSize = 25 * scale;
    const roastHeight = 48 * scale;
    const comfortHeight = 43 * scale;
    setFont(ctx, roastSize, true);
    const roastLines = wrapLines(ctx, role.roast || role.tagline, width);
    setFont(ctx, comfortSize);
    const comfortLines = wrapLines(ctx, role.comfort, width);
    const labelTop = top + roastLines.length * roastHeight + 20 * scale;
    const comfortTop = labelTop + 76 * scale;
    layout = {
      roastSize,
      comfortSize,
      roastHeight,
      comfortHeight,
      roastLines,
      comfortLines,
      labelTop,
      comfortTop,
      scale,
    };
    if (comfortTop + comfortLines.length * comfortHeight <= bottom)
      return layout;
  }

  // An unexpectedly huge custom quote still gets a readable, bounded card.
  setFont(ctx, layout.roastSize, true);
  layout.roastLines = shortenLines(ctx, layout.roastLines, 3, width);
  layout.labelTop =
    top + layout.roastLines.length * layout.roastHeight + 20 * layout.scale;
  layout.comfortTop = layout.labelTop + 76 * layout.scale;
  setFont(ctx, layout.comfortSize);
  const availableLines = Math.max(
    1,
    Math.floor((bottom - layout.comfortTop) / layout.comfortHeight),
  );
  layout.comfortLines = shortenLines(
    ctx,
    layout.comfortLines,
    availableLines,
    width,
  );
  return layout;
}

// Everything is rendered locally; the card includes no answers, identity or URL.
export async function createStatusCard(role, svg, language = "zh") {
  const labels = copy[language] || copy.zh;
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1370;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3;
  ctx.strokeRect(29, 29, 842, 1312);
  ctx.fillStyle = ink;
  ctx.fillRect(30, 30, 840, 98);
  ctx.fillStyle = "#d5fb66";
  fittedFont(ctx, labels.brand, 775, 34, true);
  ctx.fillText(labels.brand, 62, 80);
  ctx.fillStyle = "#bbc2ae";
  ctx.font = "17px monospace";
  ctx.fillText("NO PERFORMANCE REVIEW. NO PERMANENT LABEL.", 63, 110);
  ctx.fillStyle = role.color;
  ctx.fillRect(62, 163, 775, 540);
  ctx.strokeStyle = ink;
  ctx.strokeRect(62, 163, 775, 540);
  ctx.fillStyle = ink;
  ctx.font = "bold 20px monospace";
  ctx.fillText(role.statusCode, 80, 195);
  ctx.font = "17px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(labels.validity, 816, 195);
  ctx.textAlign = "left";
  let imageUrl;
  try {
    imageUrl = URL.createObjectURL(
      new Blob([new XMLSerializer().serializeToString(svg)], {
        type: "image/svg+xml;charset=utf-8",
      }),
    );
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });
    ctx.drawImage(img, 231, 213, 438, 420);
  } finally {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
  }
  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  fittedFont(ctx, role.name, 775, 39, true);
  ctx.fillText(role.name, 450, 665);
  ctx.textAlign = "left";
  const tags = role.tags.map((tag) => "# " + tag).join("   ");
  let tagLines;
  for (let size = 20; size >= 14; size -= 1) {
    setFont(ctx, size);
    tagLines = wrapLines(ctx, tags, 768);
    if (tagLines.length <= 2) break;
  }
  tagLines = shortenLines(ctx, tagLines, 2, 768);
  ctx.fillStyle = "#657353";
  writeLines(ctx, tagLines, { x: 65, y: 748, lineHeight: 27 });
  const textTop = Math.max(805, 748 + (tagLines.length - 1) * 27 + 54);
  const body = bodyLayout(ctx, role, textTop, 768, 1225);
  ctx.fillStyle = ink;
  setFont(ctx, body.roastSize, true);
  writeLines(ctx, body.roastLines, {
    x: 65,
    y: textTop,
    lineHeight: body.roastHeight,
  });
  ctx.fillStyle = "#d5fb66";
  setFont(ctx, 19, true);
  const opinionWidth = Math.max(
    178,
    Math.ceil(ctx.measureText(labels.opinion).width) + 30,
  );
  ctx.fillRect(65, body.labelTop - 3, opinionWidth, 34);
  ctx.fillStyle = ink;
  ctx.fillText(labels.opinion, 80, body.labelTop + 21);
  setFont(ctx, body.comfortSize);
  writeLines(ctx, body.comfortLines, {
    x: 65,
    y: body.comfortTop,
    lineHeight: body.comfortHeight,
  });
  ctx.strokeStyle = "#9ca98b";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(65, 1256);
  ctx.lineTo(833, 1256);
  ctx.stroke();
  setFont(ctx, 19);
  ctx.fillStyle = "#67795a";
  const footerLines = wrapLines(ctx, labels.footer, 768);
  writeLines(ctx, footerLines, {
    x: 65,
    y: footerLines.length === 1 ? 1300 : 1290,
    lineHeight: 26,
  });
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("PNG export failed");
  return blob;
}
