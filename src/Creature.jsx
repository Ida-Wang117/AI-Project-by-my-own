import React from "react";

const ink = "#1f2220";
const paper = "#f7f5e9";
const lime = "#d5fb66";
const blue = "#4066ed";
const salmon = "#ff9068";
const yellow = "#f8e669";
const lavender = "#b9a7f1";
const line = {
  stroke: ink,
  strokeWidth: 4.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// The eyelids and heavy bags do the talking. No blush, no mandatory smile.
function DeadEyes({ x = 120, y = 100, size = 1, bags = lavender }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <path d="M-38 12q16 27 32 0M7 12q16 27 32 0" fill={bags} {...line} />
      <ellipse cx="-22" cy="0" rx="16" ry="16" fill={paper} {...line} />
      <ellipse cx="23" cy="1" rx="16" ry="16" fill={paper} {...line} />
      <path d="M-37 -2l30 2M9 0l29 -2" fill="none" {...line} />
      <path
        d="M-21 4v5M23 4v5"
        fill="none"
        stroke={ink}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
}

function Badge({ x = 113, y = 151, fill = lime, turn = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`}>
      <path d="M-8 -25l7 24 9 -24" fill="none" {...line} />
      <path d="M-16 0l32 -2 2 34 -35 1Z" fill={fill} {...line} />
      <circle cx="-3" cy="10" r="4" fill={ink} />
      <path d="M-7 20h17M-7 26h10" fill="none" stroke={ink} strokeWidth="3" />
    </g>
  );
}

function Monitor({ x, y, fill, label, tilt = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <path d="M0 0l85 -2 2 46 -87 3Z" fill={fill} {...line} />
      <path
        d="M2 8h82M9 4h1m6 0h1m6 0h1"
        fill="none"
        stroke={ink}
        strokeWidth="2"
      />
      <text
        x="42"
        y="34"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="17"
        fontWeight="900"
        fill={ink}
      >
        {label}
      </text>
      <path d="M37 48v9m-13 1h27" fill="none" {...line} />
    </g>
  );
}

export default function Creature({
  id = "night-owl",
  className = "",
  title,
  ...props
}) {
  const art = {
    "night-owl": (
      <>
        <path
          d="M61 65L50 25l39 18q32 -8 56 1l35 -24 -4 45q22 39 7 84l-20 32 -97 -2 -26 -37q-8 -46 21 -77Z"
          fill={lavender}
          {...line}
        />
        <path
          d="M77 43l6 17M158 42l-9 18M61 133l20 28m99 -33l-23 32"
          fill="none"
          {...line}
        />
        <path
          d="M44 65Q35 5 118 7q83 1 74 65"
          fill="none"
          stroke={ink}
          strokeWidth="7"
        />
        <path
          d="M42 59l12 -1 2 44 -17 -3Z M182 59l17 2 -3 39 -15 2Z"
          fill={salmon}
          {...line}
        />
        <path d="M196 91l14 19 -21 12" fill="none" {...line} />
        <circle cx="186" cy="121" r="5" fill={ink} />
        <DeadEyes x={118} y={91} size={1.13} bags="#8570c4" />
        <path d="M108 118l10 14 12 -15Z" fill={yellow} {...line} />
        <path d="M97 143l8 9m15 -7v11m17 -13l-4 10" fill="none" {...line} />
        <Monitor x={18} y={164} fill={lime} label="03:07" tilt={-5} />
        <Monitor x={129} y={156} fill={blue} label="404" tilt={5} />
        <path d="M17 223l206 -2" fill="none" {...line} />
        <path d="M84 214l51 -2 6 10 -62 1Z" fill={paper} {...line} />
        <path d="M90 217h36" fill="none" stroke={ink} strokeWidth="2" />
      </>
    ),
    jellyfish: (
      <>
        <path
          d="M58 143q-23 20 -4 43l-17 22M86 145q-12 24 4 42l-8 25M115 146q14 21 -6 42l8 30M143 144q-2 23 22 25l-10 29M174 139q20 2 20 27"
          fill="none"
          stroke={ink}
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M58 143q-23 20 -4 43l-17 22M86 145q-12 24 4 42l-8 25M115 146q14 21 -6 42l8 30M143 144q-2 23 22 25l-10 29"
          fill="none"
          stroke={salmon}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M31 135q2 -41 27 -74Q81 31 126 36q69 4 72 83l8 20 -16 8 -20 -5 -18 10 -18 -4 -21 7 -18 -8 -23 5 -19 -9 -22 6Z"
          fill={salmon}
          {...line}
        />
        <path d="M50 92l6 -20 18 -14M75 49l6 -3" fill="none" {...line} />
        <DeadEyes x={118} y={102} size={1.06} bags="#d26f55" />
        <path d="M104 135l23 -3" fill="none" {...line} />
        <g transform="translate(173 153) rotate(10)">
          <path d="M0 0h44l2 64 -46 1Z" fill={paper} {...line} />
          <path d="M7 8h30v43H7Z" fill={lime} {...line} />
          <path d="M16 3h10M17 59h9" fill="none" stroke={ink} strokeWidth="3" />
          <path
            d="M13 18h19v10H13Z M33 21h3v4"
            fill="none"
            stroke={ink}
            strokeWidth="2"
          />
          <path d="M15 21h3v5h-3Z" fill={salmon} />
          <text
            x="22"
            y="44"
            fontSize="13"
            fontFamily="monospace"
            fontWeight="900"
            textAnchor="middle"
            fill={ink}
          >
            2%
          </text>
        </g>
        <path
          d="M29 18h20l-11 13h15l-21 15 6 -15H26Z"
          fill={yellow}
          {...line}
        />
        <path d="M24 18l34 30" fill="none" stroke={ink} strokeWidth="3" />
        <path d="M24 210l13 -3 4 12 -14 2Z" fill={paper} {...line} />
        <path d="M82 207l9 1 -1 12 -13 -2Z" fill={paper} {...line} />
      </>
    ),
    cactus: (
      <>
        <path
          d="M88 167l-2 -48 -27 -1q-23 -2 -23 -28V66l24 -2 3 27 23 2 -2 -38q2 -29 29 -30 33 -1 34 30l-2 58 26 -1 3 -30 23 2 -1 34q0 20 -28 24l-22 1 2 27Z"
          fill={lime}
          {...line}
        />
        <path
          d="M88 54l-12 -7M117 25l3 -12M146 71l14 -7M83 85l-10 -6M35 81l-11 -5M196 105l12 -4M102 154l-13 -3"
          fill="none"
          {...line}
        />
        <DeadEyes x={115} y={91} size={0.75} bags="#a9c94c" />
        <path d="M107 119l17 -1" fill="none" {...line} />
        <Badge x={120} y={142} fill={paper} turn={-7} />
        <path d="M72 174l92 -2 -9 43 -71 -1Z" fill={blue} {...line} />
        <path d="M68 164l101 -1 -3 15 -97 2Z" fill={blue} {...line} />
        <path
          d="M95 192l42 -1m-35 9l31 -1"
          fill="none"
          stroke={paper}
          strokeWidth="3"
        />
        <g transform="translate(12 118) rotate(-13)">
          <path d="M0 0h56v34H0Z" fill={paper} {...line} />
          <path
            d="M2 3l26 19 26 -19"
            fill="none"
            stroke={ink}
            strokeWidth="3"
          />
          <path
            d="M5 10l42 10M12 31l29 -27"
            fill="none"
            stroke={salmon}
            strokeWidth="5"
          />
        </g>
        <path d="M194 38l20 -2 3 27 -23 2Z" fill={salmon} {...line} />
        <text
          x="204"
          y="57"
          fontFamily="monospace"
          fontWeight="900"
          fontSize="15"
          textAnchor="middle"
          fill={ink}
        >
          !
        </text>
      </>
    ),
    snail: (
      <>
        <path
          d="M37 185q3 -22 35 -24l78 1 7 -69 38 -2 -2 65q18 5 22 17l-7 16 -128 3 -39 -2Z"
          fill={lavender}
          {...line}
        />
        <path
          d="M52 151q-26 -31 -11 -74 16 -43 62 -40 53 2 58 54 5 43 -24 69Z"
          fill={yellow}
          {...line}
        />
        <path
          d="M62 139L55 81l35 -23 43 14 8 54 -28 22 -35 -20 1 -37 24 -9 16 19 -14 16 -10 -9"
          fill="none"
          {...line}
        />
        <path
          d="M76 142l6 -9m8 -10l6 -7m7 -11l7 -8m0 -13l-3 -8"
          fill="none"
          stroke={salmon}
          strokeWidth="4"
        />
        <path
          d="M108 66l12 12m0 -12l-12 12"
          fill="none"
          stroke={salmon}
          strokeWidth="5"
        />
        <path d="M166 97l-3 -32M190 96l17 -29" fill="none" {...line} />
        <circle cx="160" cy="55" r="16" fill={paper} {...line} />
        <circle cx="211" cy="55" r="16" fill={paper} {...line} />
        <path d="M145 53h30M197 53h28M162 57v5m48 -5v5" fill="none" {...line} />
        <path d="M173 121l13 1M174 134l7 -1" fill="none" {...line} />
        <path d="M59 176l7 1m7 -1h5m8 0h6" fill="none" {...line} />
        <path d="M73 193l120 -1 -4 10 -110 1Z" fill={blue} {...line} />
        <path d="M132 203v14m-34 4l33 -6 34 5" fill="none" {...line} />
        <circle cx="99" cy="221" r="6" fill={ink} />
        <circle cx="165" cy="221" r="6" fill={ink} />
        <path d="M180 142l28 11 -3 19 -30 -10Z" fill={lime} {...line} />
        <path d="M185 151l12 5 -6 2" fill="none" stroke={ink} strokeWidth="3" />
      </>
    ),
    potato: (
      <>
        <path d="M171 48l36 3 -3 116 -19 15 -30 -8Z" fill={salmon} {...line} />
        <path d="M182 62l10 2 -5 83" fill="none" {...line} />
        <path d="M70 171l125 -3 4 25 -124 5Z" fill={salmon} {...line} />
        <path d="M140 195l-1 21 -37 5m37 -5l33 6" fill="none" {...line} />
        <circle cx="103" cy="221" r="6" fill={ink} />
        <circle cx="172" cy="222" r="6" fill={ink} />
        <path
          d="M49 112q-7 -46 22 -64 29 -17 48 5l20 35q45 20 36 56l-21 28 -48 4 -38 -16 -19 -27Z"
          fill="#d6bc85"
          {...line}
        />
        <path
          d="M66 58l5 -2m49 29l5 4m22 60l2 -5M77 134l-5 -3"
          fill="none"
          stroke={ink}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <DeadEyes x={92} y={88} size={0.83} bags="#aa946a" />
        <path d="M88 115l20 -4" fill="none" {...line} />
        <path
          d="M65 133q-32 11 -29 50l15 2 9 -25m104 -20l20 18"
          fill="none"
          {...line}
        />
        <path
          d="M75 167l-7 23 -23 3M149 171l-10 26 22 8"
          fill="none"
          stroke={ink}
          strokeWidth="8"
        />
        <path
          d="M30 186l27 -4 4 16 -32 1Z M148 200l22 5 -4 12 -27 -9Z"
          fill={paper}
          {...line}
        />
        <g transform="translate(97 129) rotate(9)">
          <path d="M0 0h69l-2 40 -64 -1Z" fill={paper} {...line} />
          <path
            d="M9 -2l17 4m25 -4l12 4"
            fill="none"
            stroke={blue}
            strokeWidth="5"
          />
          <text
            x="34"
            y="17"
            fontFamily="monospace"
            fontSize="12"
            fontWeight="900"
            textAnchor="middle"
            fill={ink}
          >
            PAUSE
          </text>
          <path d="M27 24v9m12 -9v9" fill="none" stroke={ink} strokeWidth="6" />
        </g>
        <path d="M20 29l21 3 -8 15 -17 -2Z" fill={lime} {...line} />
        <path d="M23 36l9 1" fill="none" stroke={ink} strokeWidth="3" />
      </>
    ),
    cat: (
      <>
        <path
          d="M57 76L49 28l42 26q29 -9 55 1l40 -29 -5 50q25 27 7 59l-21 23 2 46 -91 3 -1 -50q-35 -18 -34 -48 0 -19 14 -33Z"
          fill="#b7bbb7"
          {...line}
        />
        <path d="M62 43l4 24 15 -7M172 44l-15 18 17 2" fill={ink} />
        <path
          d="M65 91l33 -18 44 7 27 23 -7 35 -35 15 -43 -12 -25 -26Z"
          fill={paper}
          {...line}
        />
        <DeadEyes x={114} y={104} size={0.9} bags="#b7bbb7" />
        <path d="M109 128h12l-6 7Zm-6 15l22 -2" fill={ink} />
        <path
          d="M47 108l-27 -6m24 19l-24 9m167 -25l24 -9m-23 25l23 9"
          fill="none"
          {...line}
        />
        <path d="M79 163l83 -3 8 36 -96 5Z" fill={blue} {...line} />
        <path
          d="M83 191q-31 20 -51 0 -21 -20 -3 -32l13 11"
          fill="none"
          stroke={ink}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <Badge x={112} y={167} fill={lime} turn={10} />
        <path
          d="M141 162l29 7 12 -22"
          fill="none"
          stroke={ink}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <g transform="translate(183 144) rotate(-15)">
          <path d="M-8 -16l20 -1 3 18 -23 1Z" fill={salmon} {...line} />
          <path d="M-14 1h36v13h-36Z" fill={salmon} {...line} />
        </g>
        <g transform="translate(136 190) rotate(-4)">
          <path d="M0 0h83v30H0Z" fill={paper} {...line} />
          <path
            d="M2 2l40 17 38 -17"
            fill="none"
            stroke={ink}
            strokeWidth="2"
          />
          <path
            d="M21 7h43v17H21Z"
            fill={salmon}
            stroke={ink}
            strokeWidth="3"
          />
          <text
            x="43"
            y="21"
            fontFamily="monospace"
            fontSize="15"
            fontWeight="900"
            textAnchor="middle"
            fill={ink}
          >
            NO.
          </text>
        </g>
      </>
    ),
    duck: (
      <>
        <path
          d="M19 170l27 -8 33 9 30 -5 32 5 28 -8 43 9 13 33 -37 15 -109 -1 -50 -18Z"
          fill={blue}
          {...line}
        />
        <path
          d="M25 182l17 -3m149 14l22 -3m-61 17l23 -1M24 211l28 2"
          fill="none"
          stroke={paper}
          strokeWidth="3"
        />
        <path
          d="M75 100q-18 -42 10 -62 33 -23 62 -2 24 17 16 52l-6 19 27 20 -10 54 -96 -1 -18 -43Z"
          fill={yellow}
          {...line}
        />
        <path d="M151 65l63 8 2 17 -64 10Z" fill={salmon} {...line} />
        <path d="M165 82l37 -1" fill="none" stroke={ink} strokeWidth="3" />
        <DeadEyes x={111} y={65} size={0.68} bags="#d6c44b" />
        <path d="M92 29l14 -14 -1 11 18 -9 -3 14" fill={yellow} {...line} />
        <path
          d="M76 104l35 16 43 -15 26 23 -6 53 -95 -1 -18 -43Z"
          fill={ink}
          {...line}
        />
        <path d="M91 112l21 11 29 -12 -22 52Z" fill={paper} {...line} />
        <path
          d="M110 125l11 -1 4 9 -9 21 -10 -18Z"
          fill={lime}
          stroke={ink}
          strokeWidth="3"
        />
        <path
          d="M64 139l23 22m71 -24l-17 19"
          fill="none"
          stroke={paper}
          strokeWidth="3"
        />
        <path d="M129 147h29v29h-29Z" fill={paper} {...line} />
        <path d="M158 151h9q8 11 -9 17" fill="none" {...line} />
        <path
          d="M86 180l-8 16 -27 4 8 12 37 -5 13 -24M144 184l13 12 38 -2 -4 17 -46 -1 -12 -20"
          fill={salmon}
          {...line}
        />
        <path
          d="M33 191l18 -1M43 215l-20 1m176 -2l16 -1m-18 -16l22 -2"
          fill="none"
          {...line}
        />
      </>
    ),
    sprout: (
      <>
        <path d="M111 91l5 -40" fill="none" {...line} />
        <path d="M116 61Q65 77 53 26q47 -13 63 35Z" fill={lime} {...line} />
        <path d="M116 54q5 -41 59 -31 4 43 -59 38Z" fill={lime} {...line} />
        <path
          d="M67 35l40 23m16 -8l35 -17"
          fill="none"
          stroke={ink}
          strokeWidth="3"
        />
        <path
          d="M78 38l-3 10 7 3m67 -15l3 8 8 -4"
          fill="none"
          stroke={ink}
          strokeWidth="3"
        />
        <path d="M66 95l111 -4 -17 104 -72 2Z" fill={paper} {...line} />
        <ellipse cx="120" cy="93" rx="56" ry="14" fill="#77684d" {...line} />
        <path d="M73 94l34 5 55 -5" fill="none" stroke={ink} strokeWidth="3" />
        <path d="M75 153l96 -5 -5 30 -87 5Z" fill={yellow} {...line} />
        <DeadEyes x={120} y={126} size={0.86} bags="#cecab8" />
        <path d="M111 153l21 -3" fill="none" {...line} />
        <path
          d="M105 165l16 -8 15 7 -15 9Z M105 165l-8 -7v15Z"
          fill={blue}
          stroke={ink}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="129" cy="164" r="2" fill={paper} />
        <path
          d="M89 194l-4 17 -24 2 -1 9 41 -1 6 -25M143 195l2 14 21 4 1 9 -39 -2 -1 -23"
          fill={ink}
          {...line}
        />
        <path d="M72 127q-23 5 -26 -22l-6 -20" fill="none" {...line} />
        <path d="M19 69l33 3 -4 42 -32 -4Z" fill={blue} {...line} />
        <path
          d="M23 78l23 2 -3 23 -22 -2Z"
          fill={lime}
          stroke={ink}
          strokeWidth="2"
        />
        <path
          d="M28 86l10 2m-7 8l10 1"
          fill="none"
          stroke={ink}
          strokeWidth="3"
        />
        <path d="M164 116l25 8 -1 23" fill="none" {...line} />
        <path d="M178 146l25 2 -2 30 -25 -2Z" fill={salmon} {...line} />
        <text
          x="189"
          y="168"
          fontFamily="monospace"
          fontSize="12"
          fontWeight="900"
          textAnchor="middle"
          fill={ink}
        >
          OFF
        </text>
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 240 230"
      className={`creature ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title || "今日物种办公室状态角色"}
      {...props}
    >
      <title>{title || "今日物种办公室状态角色"}</title>
      {art[id] || art["night-owl"]}
    </svg>
  );
}
