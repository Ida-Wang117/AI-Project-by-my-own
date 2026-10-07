const ids = [
  "night-owl",
  "jellyfish",
  "cactus",
  "snail",
  "potato",
  "cat",
  "duck",
  "sprout",
];

export const blindBoxSheetUrl = `${import.meta.env?.BASE_URL || "./"}blind-boxes.png`;

export function getSpritePosition(id) {
  const index = Math.max(0, ids.indexOf(id));
  return { column: index % 4, row: Math.floor(index / 4) };
}
