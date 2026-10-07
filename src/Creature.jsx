import React from "react";

const ink = "#30312e";

function Face({ x = 120, y = 105, sleepy = false }) {
  return (
    <g stroke={ink} strokeWidth="4" strokeLinecap="round" fill="none">
      {sleepy ? (
        <>
          <path d={`M${x - 27} ${y}l11 2M${x + 15} ${y + 2}l11 -2`} />
          <path d={`M${x - 3} ${y + 19}q7 -4 12 0`} />
        </>
      ) : (
        <>
          <path d={`M${x - 22} ${y}v5M${x + 22} ${y}v5`} />
          <path d={`M${x - 7} ${y + 20}q7 7 14 0`} />
        </>
      )}
      <ellipse
        cx={x - 34}
        cy={y + 13}
        rx="8"
        ry="4"
        fill="#ed8978"
        stroke="none"
        opacity=".55"
      />
      <ellipse
        cx={x + 34}
        cy={y + 13}
        rx="8"
        ry="4"
        fill="#ed8978"
        stroke="none"
        opacity=".55"
      />
    </g>
  );
}

export default function Creature({
  id = "night-owl",
  className = "",
  title,
  ...props
}) {
  const stroke = {
    stroke: ink,
    strokeWidth: 3.8,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  };
  const art = {
    "night-owl": (
      <>
        <path
          d="M58 75L47 39Q73 29 88 48Q122 37 153 49Q173 29 193 40L182 77Q202 105 186 156Q174 194 122 199Q65 196 48 166Q29 117 58 75Z"
          fill="#afa0dd"
          {...stroke}
        />
        <path
          d="M87 177l-7 31 17 -8M151 177l8 31 -17 -8"
          fill="#f7be70"
          {...stroke}
        />
        <path
          d="M78 125Q48 138 49 157M166 125Q198 129 196 153"
          fill="none"
          {...stroke}
        />
        <ellipse cx="90" cy="100" rx="26" ry="29" fill="#f9f1df" {...stroke} />
        <ellipse cx="149" cy="100" rx="26" ry="29" fill="#f9f1df" {...stroke} />
        <path d="M77 104h18M141 104h18" fill="none" {...stroke} />
        <path d="M111 122l9 12 10 -12Z" fill="#f8bc69" {...stroke} />
        <path
          d="M105 155l5 6M124 151l1 8M141 154l-4 7"
          fill="none"
          {...stroke}
        />
        <path
          d="M47 72Q33 75 34 105L49 107M190 73Q207 76 205 103L189 107"
          fill="#f4613d"
          {...stroke}
        />
        <path d="M46 76Q34 18 119 20Q202 20 193 76" fill="none" {...stroke} />
        <path
          d="M204 23q-10 12 4 17q-19 8 -24 -6q-3 -15 20 -11"
          fill="#f8bd65"
        />
        <path d="M21 38v12m-6 -6h12" {...stroke} />
      </>
    ),
    jellyfish: (
      <>
        <path
          d="M58 143q-16 29 7 52q10 17 -5 22M88 146q-9 23 9 41q11 17 0 30M119 145q-14 25 3 43q15 15 5 33M149 146q-3 21 14 35q19 22 4 34M176 141q3 20 20 30q17 17 5 33"
          fill="none"
          stroke="#dc847f"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M36 140Q37 47 116 45Q197 41 207 132Q209 152 193 150Q178 143 162 152Q146 142 131 153Q112 146 96 154Q80 144 63 151Q35 154 36 140Z"
          fill="#f2aea2"
          {...stroke}
        />
        <path
          d="M58 93q7 -26 30 -29"
          stroke="#fff0e1"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <Face sleepy x={121} y={104} />
        <path d="M164 22h27v14h-27zM192 26h4v6" fill="#fff9ed" {...stroke} />
        <path d="M168 27h6v4h-6" stroke="#f4613d" strokeWidth="3" />
      </>
    ),
    cactus: (
      <>
        <path
          d="M88 170v-45H68Q34 125 34 91V75q0 -16 17 -16q17 0 17 16v18h20V55q0 -27 29 -27q30 0 30 27v56h22V91q0 -17 17 -17q17 0 17 17v25q0 28 -34 28h-22v26"
          fill="#85b797"
          {...stroke}
        />
        <path d="M81 161h73l-8 53H91Z" fill="#eaa276" {...stroke} />
        <path d="M76 160h84v17H76Z" fill="#f4b692" {...stroke} />
        <path
          d="M102 49l-10 -7M128 35l5 -12M145 72l11 -4M90 84l-11 -4M49 82l-10 -4M191 103l13 -5M119 140v9"
          fill="none"
          {...stroke}
        />
        <Face x={117} y={99} />
        <path
          d="M21 36l10 3 -4 -12M176 45l-4 9 13 -1"
          fill="none"
          stroke="#f4613d"
          strokeWidth="4"
        />
      </>
    ),
    snail: (
      <>
        <path
          d="M32 186q3 -20 43 -20h87l10 -67q3 -17 21 -12q13 3 12 19l-3 65q20 0 22 13q2 13 -26 14H54q-26 0 -22 -12Z"
          fill="#99bca0"
          {...stroke}
        />
        <path d="M182 91l-9 -22M198 89l12 -22" {...stroke} />
        <circle cx="172" cy="67" r="7" fill="#f8f4e8" {...stroke} />
        <circle cx="211" cy="65" r="7" fill="#f8f4e8" {...stroke} />
        <path
          d="M59 166Q38 139 50 103Q66 68 103 69Q151 72 157 115Q166 152 132 170Z"
          fill="#f4c36d"
          {...stroke}
        />
        <path
          d="M72 147q-29 -31 8 -56q33 -15 48 15q15 33 -17 40q-23 3 -26 -14q-3 -15 13 -17q15 -1 12 11"
          fill="none"
          {...stroke}
        />
        <path
          d="M185 126h1M201 126h1M190 143q7 5 10 -3"
          fill="none"
          {...stroke}
        />
        <path
          d="M63 44v10m-5 -5h10M135 42l12 -8m-4 12l13 -3"
          stroke="#8d80b9"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </>
    ),
    potato: (
      <>
        <path
          d="M51 147Q30 97 60 59Q77 34 107 43Q127 32 158 53Q200 77 184 145l-5 40q-1 20 -49 25q-63 1 -71 -24Z"
          fill="#d2ad83"
          {...stroke}
        />
        <path
          d="M51 144q21 -15 38 -13q40 15 92 1l-2 49q-1 26 -51 29q-66 0 -69 -27Z"
          fill="#d7a7be"
          {...stroke}
        />
        <path
          d="M85 137v20M108 143v17M132 143v18M157 138v20M70 169q-12 0 -19 -10M166 169q10 0 19 -10"
          fill="none"
          {...stroke}
        />
        <Face x={118} y={91} sleepy />
        <path
          d="M74 72h1M159 62h1M151 116h1M77 113h1"
          stroke="#8f7154"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M28 181h20v21H28q-11 -11 0 -21M49 184h8q6 7 -4 11"
          fill="#fff9ed"
          {...stroke}
        />
      </>
    ),
    cat: (
      <>
        <path
          d="M57 91L52 39Q80 37 93 64q29 -11 54 0q20 -29 42 -24l-6 54q16 29 -3 61q-8 10 -21 16l9 31H75l11 -31Q39 156 43 121q0 -20 14 -30Z"
          fill="#f4c7bb"
          {...stroke}
        />
        <path d="M65 55l3 24 15 -6M171 57l-7 17 12 6" fill="#eaa6a3" />
        <Face x={118} y={113} />
        <path
          d="M42 127l-18 -5M45 141l-19 6M189 126l19 -6M186 141l20 5"
          {...stroke}
        />
        <path
          d="M80 163q38 15 82 -1l4 18q-40 11 -86 0Z"
          fill="#8ba0c4"
          {...stroke}
        />
        <path d="M125 183l24 2 -4 32 -27 -4Z" fill="#8ba0c4" {...stroke} />
        <path d="M62 188q-40 24 -29 -5q4 -9 10 0" fill="none" {...stroke} />
        <path d="M207 42v16m-8 -8h16" stroke="#f4613d" strokeWidth="4" />
      </>
    ),
    duck: (
      <>
        <ellipse cx="118" cy="196" rx="93" ry="18" fill="#a5c5bc" />
        <path
          d="M63 117q-11 -44 23 -67q43 -23 67 12q13 15 10 48q31 12 33 39q9 42 -50 46q-73 7 -93 -21q-24 -31 10 -57Z"
          fill="#f7d373"
          {...stroke}
        />
        <path d="M147 89q40 -5 39 11q-7 17 -41 5Z" fill="#ee966b" {...stroke} />
        <path d="M117 85v5M85 88v5" {...stroke} />
        <ellipse cx="92" cy="104" rx="9" ry="5" fill="#edb07a" />
        <path d="M127 145q-40 31 -64 4" fill="none" {...stroke} />
        <path d="M161 164h29v28h-29Z" fill="#fff9ed" {...stroke} />
        <path
          d="M191 170h8q12 9 -8 14M170 153q-5 -8 1 -15"
          fill="none"
          {...stroke}
        />
        <path
          d="M47 43l9 6M42 67l12 -1"
          stroke="#e89373"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </>
    ),
    sprout: (
      <>
        <path
          d="M60 145Q61 99 116 101Q177 99 180 145l-11 37q-8 26 -52 24q-46 3 -54 -25Z"
          fill="#d5bb92"
          {...stroke}
        />
        <path
          d="M120 104V63"
          stroke="#658a66"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M119 82Q70 88 65 36Q114 25 122 75Z"
          fill="#94b788"
          {...stroke}
        />
        <path
          d="M123 77q-1 -46 53 -49q15 49 -53 52Z"
          fill="#b7c989"
          {...stroke}
        />
        <path
          d="M81 50l38 28M159 42l-33 31"
          fill="none"
          stroke="#658a66"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Face x={120} y={145} />
        <path
          d="M50 78v16m-8 -8h16M191 90v10m-5 -5h10"
          stroke="#f4b454"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M92 194l-6 14M145 194l6 14" {...stroke} />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 240 230"
      className={`creature ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title || "今日物种手绘角色"}
      {...props}
    >
      {art[id] || art["night-owl"]}
    </svg>
  );
}
