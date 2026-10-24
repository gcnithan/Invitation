function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a = (Math.imul(a, 1664525) + 1013904223) >>> 0;
    return a / 4294967296;
  };
}

const PINK = ["#e23d78", "#d4146a", "#f06aa0", "#c2185b", "#ff7eb3", "#b01258"];
const LEAF = ["#2f6a3c", "#3e7a46", "#245632", "#4d8a52", "#1f4a2c"];

function buildCorner(seed, count) {
  const rand = mulberry(seed);
  const blossoms = [];
  const leaves = [];
  for (let i = 0; i < count; i++) {
    const x = 408 - Math.pow(rand(), 0.62) * 250;
    const y = Math.pow(rand(), 0.72) * 210;
    const s = 0.45 + rand() * 1.05;
    blossoms.push({
      x,
      y,
      s,
      rot: rand() * 360,
      fill: PINK[Math.floor(rand() * PINK.length)],
    });
    if (rand() > 0.28) {
      leaves.push({
        x: x + (rand() - 0.5) * 26,
        y: y + rand() * 18,
        rx: 8 + rand() * 11,
        ry: 3.2 + rand() * 3,
        rot: -70 + rand() * 140,
        fill: LEAF[Math.floor(rand() * LEAF.length)],
      });
    }
  }
  return { blossoms, leaves };
}

const heroSpray = buildCorner(19, 96);
const coverSpray = buildCorner(7, 72);

function Bracts({ x, y, s, rot, fill }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse cx="0" cy="-7" rx="5.2" ry="8" fill={fill} />
      <ellipse cx="6.2" cy="3.6" rx="5.2" ry="8" fill={fill} transform="rotate(120)" />
      <ellipse cx="-6.2" cy="3.6" rx="5.2" ry="8" fill={fill} transform="rotate(240)" />
      <circle cx="0" cy="0" r="1.7" fill="#fff6ea" />
      <circle cx="0" cy="0" r="0.7" fill="#f2c14e" />
    </g>
  );
}

export function Bougainvillea({ className = "", variant = "hero" }) {
  const spray = variant === "cover" ? coverSpray : heroSpray;
  return (
    <svg className={className} viewBox="0 0 420 460" aria-hidden="true">
      <path d="M418 8 C 360 36, 330 70, 300 108" fill="none" stroke="#245032" strokeWidth="1.6" />
      <path d="M430 24 C 390 58, 360 86, 332 120" fill="none" stroke="#2d5a38" strokeWidth="1.1" />
      {spray.leaves.map((leaf, i) => (
        <ellipse
          key={`l${i}`}
          cx={leaf.x}
          cy={leaf.y}
          rx={leaf.rx}
          ry={leaf.ry}
          fill={leaf.fill}
          transform={`rotate(${leaf.rot} ${leaf.x} ${leaf.y})`}
          opacity="0.92"
        />
      ))}
      {spray.blossoms.map((b, i) => (
        <Bracts key={`b${i}`} {...b} />
      ))}
    </svg>
  );
}

export function Bells() {
  return (
    <svg className="bells" viewBox="0 0 130 230" aria-hidden="true">
      <defs>
        <linearGradient id="bellGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e7b8" />
          <stop offset="0.45" stopColor="#e2c27a" />
          <stop offset="1" stopColor="#a67c3d" />
        </linearGradient>
        <linearGradient id="bellShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e2b0" />
          <stop offset="1" stopColor="#8d6230" />
        </linearGradient>
      </defs>
      <g className="bell bell-a">
        <line x1="36" y1="0" x2="36" y2="86" stroke="#d7b56a" strokeWidth="1.1" />
        {[12, 26, 40, 54, 68].map((y) => (
          <circle key={y} cx="36" cy={y} r="2.4" fill="#f0d48a" />
        ))}
        <ellipse cx="36" cy="78" rx="8" ry="4.2" fill="url(#bellGold)" />
        <path d="M20 84 Q18 132 36 140 Q54 132 52 84 Z" fill="url(#bellShade)" />
        <path d="M24 90 Q28 124 36 132 Q32 110 26 92 Z" fill="#fff1cc" opacity="0.35" />
        <circle cx="36" cy="146" r="3.1" fill="#b8893f" />
      </g>
      <g className="bell bell-b">
        <line x1="86" y1="0" x2="86" y2="48" stroke="#d7b56a" strokeWidth="1.1" />
        {[10, 22, 34].map((y) => (
          <circle key={y} cx="86" cy={y} r="2.3" fill="#f0d48a" />
        ))}
        <circle cx="86" cy="46" r="7" fill="url(#bellGold)" />
        <path d="M74 52 Q72 92 86 98 Q100 92 98 52 Z" fill="url(#bellShade)" />
        <circle cx="86" cy="104" r="2.8" fill="#b8893f" />
      </g>
    </svg>
  );
}

export function ArchFrame() {
  return (
    <svg className="arch" viewBox="0 0 320 430" fill="none" aria-hidden="true">
      <path
        d="M160 28
           C198 28 214 48 222 72
           C248 78 274 102 274 136
           C274 162 258 176 258 202
           C258 236 286 252 286 292
           C286 340 236 378 160 404
           C84 378 34 340 34 292
           C34 252 62 236 62 202
           C62 176 46 162 46 136
           C46 102 72 78 98 72
           C106 48 122 28 160 28 Z"
        stroke="#c6a56e"
        strokeWidth="1.35"
        opacity="0.8"
      />
      <path d="M160 28 L167 16 L160 6 L153 16 Z" fill="#c6a56e" opacity="0.85" />
      <path
        d="M160 46 C176 46 184 58 184 72 C184 58 192 46 208 46"
        stroke="#c6a56e"
        strokeWidth="0.8"
        opacity="0.7"
      />
    </svg>
  );
}

export function GaneshaMark() {
  return (
    <svg className="ganesha" viewBox="0 0 80 96" fill="none" aria-hidden="true">
      <path d="M40 4 L44 14 H36 Z" stroke="#c4a15f" strokeWidth="1" />
      <path d="M28 16 C34 8 46 8 52 16" stroke="#c4a15f" strokeWidth="1.1" />
      <path d="M24 14 C20 8 28 6 32 12" stroke="#c4a15f" strokeWidth="0.9" />
      <path d="M56 14 C60 8 52 6 48 12" stroke="#c4a15f" strokeWidth="0.9" />
      <ellipse cx="22" cy="34" rx="7" ry="9" stroke="#c4a15f" strokeWidth="1.1" />
      <ellipse cx="58" cy="34" rx="7" ry="9" stroke="#c4a15f" strokeWidth="1.1" />
      <circle cx="40" cy="34" r="14" stroke="#c4a15f" strokeWidth="1.15" />
      <circle cx="35" cy="32" r="1.15" fill="#c4a15f" />
      <circle cx="45" cy="32" r="1.15" fill="#c4a15f" />
      <path d="M37 38 Q40 41 43 38" stroke="#c4a15f" strokeWidth="0.9" />
      <path d="M40 40 C42 50 36 58 28 62 C22 66 20 60 26 56 C32 52 36 48 38 44" stroke="#c4a15f" strokeWidth="1.15" />
      <path d="M30 52 C24 66 34 78 40 80 C48 78 56 68 52 54" stroke="#c4a15f" strokeWidth="1.1" />
      <path d="M26 78 C22 88 34 92 40 86" stroke="#c4a15f" strokeWidth="1" />
      <path d="M54 78 C58 88 46 92 40 86" stroke="#c4a15f" strokeWidth="1" />
      <path d="M18 70 H62" stroke="#c4a15f" strokeWidth="0.8" />
    </svg>
  );
}

export function GoldFlourish({ className = "" }) {
  return (
    <svg className={`flourish ${className}`} viewBox="0 0 300 40" fill="none" aria-hidden="true">
      <path d="M8 20 H78" stroke="#c4a15f" strokeWidth="0.8" />
      <path d="M222 20 H292" stroke="#c4a15f" strokeWidth="0.8" />
      <path
        d="M78 20 C96 20 104 8 122 12 C134 15 138 26 150 20 C162 14 166 8 178 12 C196 18 206 20 222 20"
        stroke="#c4a15f"
        strokeWidth="1.05"
      />
      <path d="M96 20 C90 12 84 14 86 20 C84 26 90 28 96 20 Z" stroke="#c4a15f" strokeWidth="0.8" />
      <path d="M204 20 C210 12 216 14 214 20 C216 26 210 28 204 20 Z" stroke="#c4a15f" strokeWidth="0.8" />
      <path d="M150 20 C150 10 158 6 150 2 C142 6 150 10 150 20 Z" fill="#c4a15f" />
      <path d="M142 18 C134 12 128 16 132 22" stroke="#c4a15f" strokeWidth="0.8" />
      <path d="M158 18 C166 12 172 16 168 22" stroke="#c4a15f" strokeWidth="0.8" />
      <circle cx="78" cy="20" r="1.4" fill="#c4a15f" />
      <circle cx="222" cy="20" r="1.4" fill="#c4a15f" />
    </svg>
  );
}

export function CornerDivider() {
  return (
    <div className="corner-set" aria-hidden="true">
      <svg className="corner" viewBox="0 0 86 78">
        <path d="M8 70 V28 C8 16 16 8 30 8 H78" fill="none" stroke="#c4a15f" strokeWidth="1.1" />
        <path d="M8 58 C20 58 24 46 24 34 C24 22 32 16 46 16" fill="none" stroke="#c4a15f" strokeWidth="0.8" />
        <path d="M18 70 C18 52 28 46 40 46 C28 40 24 28 24 16" fill="none" stroke="#c4a15f" strokeWidth="0.7" />
        <path d="M40 8 C36 16 40 22 48 22 C40 26 38 34 44 40" fill="none" stroke="#c4a15f" strokeWidth="0.7" />
        <path d="M14 24 C22 20 26 26 22 32 C18 28 16 28 14 24 Z" fill="#c4a15f" opacity="0.85" />
        <circle cx="62" cy="14" r="1.3" fill="#c4a15f" />
        <path d="M66 8 C72 12 70 20 64 18" fill="none" stroke="#c4a15f" strokeWidth="0.7" />
      </svg>
      <GoldFlourish className="corner-flourish" />
      <svg className="corner corner-flip" viewBox="0 0 86 78">
        <path d="M8 70 V28 C8 16 16 8 30 8 H78" fill="none" stroke="#c4a15f" strokeWidth="1.1" />
        <path d="M8 58 C20 58 24 46 24 34 C24 22 32 16 46 16" fill="none" stroke="#c4a15f" strokeWidth="0.8" />
        <path d="M18 70 C18 52 28 46 40 46 C28 40 24 28 24 16" fill="none" stroke="#c4a15f" strokeWidth="0.7" />
        <path d="M40 8 C36 16 40 22 48 22 C40 26 38 34 44 40" fill="none" stroke="#c4a15f" strokeWidth="0.7" />
        <path d="M14 24 C22 20 26 26 22 32 C18 28 16 28 14 24 Z" fill="#c4a15f" opacity="0.85" />
        <circle cx="62" cy="14" r="1.3" fill="#c4a15f" />
        <path d="M66 8 C72 12 70 20 64 18" fill="none" stroke="#c4a15f" strokeWidth="0.7" />
      </svg>
    </div>
  );
}

export function Dome() {
  return (
    <svg className="dome" viewBox="0 0 180 150" aria-hidden="true">
      <defs>
        <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e6cf" />
          <stop offset="1" stopColor="#d7c09a" />
        </linearGradient>
      </defs>
      <path d="M90 18 C120 18 132 48 132 78 V150 H48 V78 C48 48 60 18 90 18 Z" fill="url(#stone)" />
      <path d="M90 8 L96 20 H84 Z" fill="#e7d3a4" />
      <circle cx="90" cy="28" r="4" fill="#c6a36a" />
      <path d="M62 78 Q90 58 118 78" fill="none" stroke="#b08958" strokeWidth="1.2" />
      <path d="M58 108 Q90 86 122 108" fill="#efe2c8" />
      <rect x="70" y="96" width="40" height="54" rx="20" fill="#e7d4ae" stroke="#b08958" strokeWidth="0.8" />
      <path d="M48 120 H132" stroke="#c6a36a" strokeWidth="2" />
      <path d="M40 150 V110 H48 V150 M132 150 V110 H142 V150" fill="#e6d3b2" stroke="#b08958" strokeWidth="0.6" />
    </svg>
  );
}

export function Lakeside() {
  return (
    <svg className="lakeside" viewBox="0 0 480 430" role="img" aria-label="">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ead4" />
          <stop offset="1" stopColor="#e7d2aa" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e4c4" />
          <stop offset="0.5" stopColor="#e4cfa6" />
          <stop offset="1" stopColor="#d9c093" />
        </linearGradient>
        <linearGradient id="palace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4e7cf" />
          <stop offset="1" stopColor="#c9a56d" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="40%" r="40%">
          <stop offset="0" stopColor="#fff6df" stopOpacity="0.9" />
          <stop offset="1" stopColor="#e7d2aa" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="430" fill="url(#sky)" />
      <ellipse cx="250" cy="168" rx="150" ry="70" fill="url(#glow)" />

      <g fill="#d9c49a" opacity="0.85">
        <ellipse cx="70" cy="150" rx="28" ry="16" />
        <ellipse cx="108" cy="142" rx="22" ry="14" />
        <ellipse cx="150" cy="156" rx="26" ry="15" />
        <ellipse cx="300" cy="148" rx="30" ry="16" />
        <ellipse cx="350" cy="158" rx="24" ry="13" />
        <ellipse cx="400" cy="146" rx="28" ry="15" />
      </g>

      <g fill="url(#palace)" stroke="#b68a52" strokeWidth="0.6">
        <path d="M18 250 V150 H40 V118 H52 V96 H64 V118 H76 V150 H98 V250 Z" />
        <path d="M46 96 C46 70 70 58 70 58 C70 58 94 70 94 96" />
        <circle cx="70" cy="52" r="4" fill="#e8d7b0" />
        <path d="M40 150 H76 V168 H40 Z" />
        <path d="M48 168 V210 Q58 196 68 210 V168 Z" fill="#f6ead6" />
        <rect x="108" y="176" width="54" height="74" />
        <path d="M112 176 V150 H150 V176" />
        <path d="M124 150 C124 128 146 120 146 120 C146 120 160 128 158 150" />
        <rect x="126" y="196" width="18" height="28" rx="9" fill="#f4e6cc" />
        <path d="M168 250 V132 H188 V108 H204 V132 H230 V250 Z" />
        <path d="M188 108 C188 84 204 74 204 74 C204 74 226 86 224 112" />
        <circle cx="206" cy="70" r="3.5" />
      </g>

      <g fill="url(#palace)" stroke="#b68a52" strokeWidth="0.6">
        <path d="M360 250 V70 H448 V250 Z" />
        <path d="M372 70 V40 H400 V28 H416 V40 H436 V70" />
        <path d="M386 40 C386 18 416 12 416 12 C416 12 440 20 438 44" />
        <rect x="392" y="150" width="36" height="70" rx="18" fill="#f6ead6" />
        <path d="M352 118 H456" stroke="#c6a36a" strokeWidth="3" />
        <path d="M348 250 V160 H360 V250 M448 250 V160 H462 V250" />
      </g>

      <g opacity="0.55" fill="#e6d3ae" stroke="#c2a36e" strokeWidth="0.5">
        <path d="M250 168 C250 150 270 146 270 146 C270 146 286 152 284 170 V190 H248 Z" />
        <circle cx="270" cy="142" r="3" />
      </g>

      <rect x="0" y="188" width="480" height="150" fill="url(#water)" />
      <g stroke="#f8efdc" strokeWidth="1" opacity="0.65" fill="none">
        <path d="M0 214 Q 40 208 80 214 T 160 214 T 240 214 T 320 214 T 400 214 T 480 214" />
        <path d="M0 236 Q 50 230 100 236 T 200 236 T 300 236 T 400 236 T 480 236" />
        <path d="M0 258 Q 60 252 120 258 T 240 258 T 360 258 T 480 258" />
        <path d="M0 280 Q 70 274 140 280 T 280 280 T 420 280" />
      </g>
      <g opacity="0.16" fill="#c6a36e">
        <ellipse cx="86" cy="230" rx="36" ry="8" />
        <ellipse cx="400" cy="224" rx="30" ry="7" />
      </g>

      <g>
        <path d="M0 292 H480 V318 H0 Z" fill="#e7d3aa" />
        <path d="M0 300 H480" stroke="#c6a36a" strokeWidth="2" />
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M${8 + i * 34} 318 V308 Q${20 + i * 34} 296 ${32 + i * 34} 308 V318`}
            fill="#f6ead6"
            stroke="#b88958"
            strokeWidth="0.6"
          />
        ))}
      </g>

      <g>
        {roseRow.map((rose, i) => (
          <g key={i} transform={`translate(${rose.x} ${rose.y}) scale(${rose.s})`}>
            <ellipse cx="-16" cy="8" rx="14" ry="6" fill={rose.leaf} transform="rotate(-30 -16 8)" />
            <ellipse cx="18" cy="6" rx="13" ry="5.5" fill={rose.leaf} transform="rotate(28 18 6)" />
            <circle cx="0" cy="0" r="9" fill={rose.c1} />
            <circle cx="-6" cy="-4" r="6" fill={rose.c2} />
            <circle cx="6" cy="-3" r="6.5" fill={rose.c1} />
            <circle cx="0" cy="2" r="3" fill="#f6e2b0" opacity="0.8" />
          </g>
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={`w${i}`}
            cx={30 + ((i * 47) % 430)}
            cy={300 + ((i * 29) % 36)}
            r={1.4 + (i % 3)}
            fill="#fffaf2"
            opacity="0.85"
          />
        ))}
      </g>
    </svg>
  );
}

const roseRow = [
  { x: 36, y: 300, s: 1.15, c1: "#a31848", c2: "#d23a6c", leaf: "#2f6a3c" },
  { x: 78, y: 286, s: 0.8, c1: "#e7b4c4", c2: "#f4d5de", leaf: "#3e7a46" },
  { x: 112, y: 308, s: 1, c1: "#c45c74", c2: "#e8a0b0", leaf: "#245632" },
  { x: 390, y: 292, s: 1.05, c1: "#b11d52", c2: "#e25684", leaf: "#2f6a3c" },
  { x: 430, y: 304, s: 0.9, c1: "#e4b0a8", c2: "#f6d2c8", leaf: "#3d7344" },
  { x: 454, y: 280, s: 0.7, c1: "#f2d0dc", c2: "#fff", leaf: "#4d8a52" },
];

export function PalaceWatermark() {
  return (
    <svg className="watermark" viewBox="0 0 480 420" aria-hidden="true">
      <g fill="#e5d2b0" stroke="#d4bc92" strokeWidth="1" opacity="0.9">
        <path d="M70 300 V180 H100 V140 H130 V110 H160 V140 H190 V180 H230 V300 Z" />
        <path d="M130 110 C130 70 190 60 190 60 C190 60 230 74 220 120" />
        <circle cx="190" cy="52" r="6" />
        <path d="M250 300 V160 H290 V120 H330 V90 H370 V120 H410 V300 Z" />
        <path d="M330 90 C330 50 390 40 390 40 C390 40 430 56 420 100" />
        <rect x="300" y="190" width="50" height="70" rx="24" fill="#f3e6d0" />
        <path d="M40 300 H450" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M${60 + i * 48} 300 V250 Q${80 + i * 48} 230 ${100 + i * 48} 250 V300`} fill="#f6ecda" />
        ))}
      </g>
    </svg>
  );
}

export function SideSpray({ side = "left" }) {
  const flowers = side === "left"
    ? [
        [20, 80, 1, "#d4146a"],
        [48, 40, 0.8, "#e23d78"],
        [18, 130, 0.7, "#f06aa0"],
        [60, 110, 0.55, "#c2185b"],
      ]
    : [
        [70, 30, 1.1, "#9d2048"],
        [40, 70, 0.75, "#e7b0b8"],
        [96, 78, 0.6, "#fff6ea"],
        [24, 20, 0.5, "#f4d5de"],
      ];
  return (
    <svg className={`spray spray-${side}`} viewBox="0 0 120 180" aria-hidden="true">
      <path d={side === "left" ? "M10 170 C 20 80, 40 60, 70 10" : "M100 170 C 80 90, 60 70, 20 16"} stroke="#2f6a3c" strokeWidth="1.4" fill="none" />
      <ellipse cx={side === "left" ? 34 : 78} cy="90" rx="16" ry="6" fill="#2f6a3c" transform={`rotate(-40 ${side === "left" ? 34 : 78} 90)`} />
      <ellipse cx={side === "left" ? 50 : 60} cy="120" rx="14" ry="5" fill="#3e7a46" transform={`rotate(30 ${side === "left" ? 50 : 60} 120)`} />
      {flowers.map(([x, y, s, fill], i) => (
        <Bracts key={i} x={x} y={y} s={s} rot={i * 40} fill={fill} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={20 + i * 11} cy={40 + (i % 4) * 22} r="1.6" fill="#fffaf2" />
      ))}
    </svg>
  );
}

export function PhotoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r="16" fill="none" stroke="#c4a15f" strokeWidth="0.8" />
      <path d="M18 8 C20 12 24 13 24 18 C24 23 20 26 18 28 C16 26 12 23 12 18 C12 13 16 12 18 8 Z" fill="none" stroke="#c4a15f" strokeWidth="0.9" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg className="send-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 11.5 L21 4 L13.5 21 L11 13 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
