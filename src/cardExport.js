const ink = "#20231f";
const paper = "#f1f0e8";

function writeWrapped(ctx, text, { x, y, width, lineHeight }) {
  let line = "";
  for (const character of Array.from(text)) {
    if (ctx.measureText(line + character).width > width) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = character;
    } else line += character;
  }
  if (line) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

// Everything is rendered locally; the card includes no answers, identity or URL.
export async function createStatusCard(role, svg) {
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
  ctx.font = "bold 34px sans-serif";
  ctx.fillText("今日物种 / 状态工牌", 62, 80);
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
  ctx.fillText("有效期：近两周", 816, 195);
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
  ctx.font = "bold 39px sans-serif";
  ctx.fillText(role.name, 450, 665);
  ctx.textAlign = "left";
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "#657353";
  ctx.fillText(role.tags.map((tag) => "# " + tag).join("   "), 65, 748);
  ctx.fillStyle = ink;
  ctx.font = "bold 33px sans-serif";
  let y = writeWrapped(ctx, role.roast || role.tagline, {
    x: 65,
    y: 805,
    width: 768,
    lineHeight: 48,
  });
  y += 20;
  ctx.fillStyle = "#d5fb66";
  ctx.fillRect(65, y - 3, 178, 34);
  ctx.fillStyle = ink;
  ctx.font = "bold 19px sans-serif";
  ctx.fillText("本窗口意见", 80, y + 21);
  ctx.font = "25px sans-serif";
  y = writeWrapped(ctx, role.comfort, {
    x: 65,
    y: y + 76,
    width: 768,
    lineHeight: 43,
  });
  if (y > 1240) throw new Error("Card text exceeds its layout");
  ctx.strokeStyle = "#9ca98b";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(65, 1256);
  ctx.lineTo(833, 1256);
  ctx.stroke();
  ctx.font = "19px sans-serif";
  ctx.fillStyle = "#67795a";
  ctx.fillText("仅作状态嘴替，不作绩效证明。禁止用于自我整改大会。", 65, 1300);
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("PNG export failed");
  return blob;
}
