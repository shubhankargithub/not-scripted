import { CATEGORY_MAP } from "@/lib/articles";

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface ArtProps {
  seed: string;
  category: string;
  ratio?: "wide" | "box" | "tall";
  className?: string;
}

const VIEW = {
  wide: { w: 800, h: 450 },
  box: { w: 600, h: 600 },
  tall: { w: 600, h: 800 },
} as const;

/**
 * Original vector artwork generated from the article slug and its desk palette.
 * Every motif is kept to a handful of shapes so that a page carrying ninety
 * pieces of artwork still ships a light document.
 */
export function ArticleArt({ seed, category, ratio = "wide", className = "" }: ArtProps) {
  const cat = CATEGORY_MAP[category];
  const accent = cat?.accent ?? "#B3271E";
  const hue = cat?.hue ?? "#EADFD2";
  const ink = "#14181d";

  const { w, h } = VIEW[ratio];
  const h32 = hash(seed);
  const rnd = mulberry(h32);
  const id = `a${h32.toString(36)}`;
  const motif = h32 % 6;
  const rot = (h32 >> 3) % 4;

  const shapes: React.ReactNode[] = [];

  if (motif === 0) {
    const cx = w * (0.34 + rnd() * 0.32);
    const cy = h * (0.38 + rnd() * 0.24);
    const r = Math.min(w, h) / 2.1;
    for (let i = 4; i >= 1; i -= 1) {
      shapes.push(
        <circle key={i} cx={cx} cy={cy} r={(r * i) / 4} fill={i % 2 === 0 ? accent : hue} fillOpacity={i % 2 === 0 ? 0.9 : 0.72} />,
      );
    }
  } else if (motif === 1) {
    const cols = 6;
    const rows = 3;
    const cw = w / cols;
    const rh = h / rows;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const v = rnd();
        if (v < 0.45) continue;
        shapes.push(
          <rect
            key={`${r}-${c}`}
            x={c * cw + cw * 0.15}
            y={r * rh + rh * 0.15}
            width={cw * 0.7}
            height={rh * 0.7}
            fill={v > 0.85 ? accent : ink}
            fillOpacity={v > 0.85 ? 0.95 : 0.18}
          />,
        );
      }
    }
  } else if (motif === 2) {
    const n = 7;
    const gap = 4;
    const bw = (w - gap * (n - 1)) / n;
    for (let i = 0; i < n; i += 1) {
      const t = i / (n - 1);
      const bh = h * (0.18 + 0.72 * Math.abs(Math.sin(t * 3.1 + rnd() * 0.4)));
      shapes.push(
        <rect
          key={i}
          x={i * (bw + gap)}
          y={h - bh}
          width={bw}
          height={bh}
          fill={i === Math.floor(n / 2) ? accent : ink}
          fillOpacity={i === Math.floor(n / 2) ? 1 : 0.22}
        />,
      );
    }
  } else if (motif === 3) {
    const lines = 10;
    const lh = h / lines;
    for (let i = 0; i < lines; i += 1) {
      const t = i / lines;
      const lw = w * (0.22 + 0.72 * (0.5 + 0.5 * Math.sin(t * 6.2)));
      shapes.push(
        <rect
          key={i}
          x={w * 0.06}
          y={i * lh + lh * 0.24}
          width={lw}
          height={lh * 0.42}
          fill={i % 5 === 0 ? accent : ink}
          fillOpacity={i % 5 === 0 ? 1 : 0.24}
        />,
      );
    }
  } else if (motif === 4) {
    shapes.push(
      <path
        key="m"
        d={`M0 ${h * 0.72} L${w * 0.3} ${h * 0.4} L${w * 0.55} ${h * 0.62} L${w * 0.78} ${h * 0.22} L${w} ${h * 0.48} L${w} ${h} L0 ${h} Z`}
        fill={accent}
        fillOpacity="0.94"
      />,
      <path
        key="m2"
        d={`M0 ${h * 0.86} L${w * 0.24} ${h * 0.66} L${w * 0.46} ${h * 0.82} L${w * 0.72} ${h * 0.56} L${w} ${h * 0.74} L${w} ${h} L0 ${h} Z`}
        fill={ink}
        fillOpacity="0.28"
      />,
    );
  } else {
    const cols = 7;
    const rows = 4;
    const cw = w / cols;
    const rh = h / rows;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const v = rnd();
        if (v < 0.52) continue;
        shapes.push(
          <circle
            key={`${r}-${c}`}
            cx={c * cw + cw / 2}
            cy={r * rh + rh / 2}
            r={(Math.min(cw, rh) / 2) * (0.32 + 0.58 * v)}
            fill={v > 0.9 ? accent : ink}
            fillOpacity={v > 0.9 ? 1 : 0.26}
          />,
        );
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Original vector artwork by NOT SCRIPTED"
    >
      <defs>
        <pattern
          id={`${id}h`}
          width="9"
          height="9"
          patternTransform={`rotate(${rot * 15})`}
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke={ink} strokeOpacity="0.12" strokeWidth="1.6" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={hue} />
      <g>{shapes}</g>
      <rect width={w} height={h} fill={`url(#${id}h)`} />
    </svg>
  );
}