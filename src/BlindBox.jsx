import React, { useId } from "react";
import { blindBoxSheetUrl, getSpritePosition } from "./blindBoxAssets.js";

// One original sheet, cached once. The viewport shows one of eight square toys.
export default function BlindBox({ id, title, className = "", ...props }) {
  const { column, row } = getSpritePosition(id);
  const clipId = useId();
  return (
    <svg
      viewBox="0 0 400 400"
      className={`creature blind-box-art ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      data-blind-box={id}
      {...props}
    >
      <title>{title}</title>
      <defs>
        <clipPath id={clipId}>
          <rect width="400" height="400" />
        </clipPath>
      </defs>
      <image
        clipPath={`url(#${clipId})`}
        href={blindBoxSheetUrl}
        x={-column * 400}
        y={-row * 400}
        width="1600"
        height="800"
        preserveAspectRatio="none"
      />
    </svg>
  );
}
