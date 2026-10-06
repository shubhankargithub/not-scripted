import Link from "next/link";

interface WordmarkProps {
  size?: "lg" | "md" | "sm";
  className?: string;
  /** Renders plain markup instead of a link. */
  asText?: boolean;
  /** Inverts to paper-on-ink. */
  inverted?: boolean;
}

const SIZES = {
  lg: { wrap: "text-[clamp(1.25rem,5.6vw,4.6rem)]", gap: "gap-[0.2em]", track: "tracking-[-0.03em]" },
  md: { wrap: "text-[clamp(1.1rem,3.6vw,2.4rem)]", gap: "gap-[0.19em]", track: "tracking-[-0.028em]" },
  sm: { wrap: "text-[1rem]", gap: "gap-[0.17em]", track: "tracking-[-0.02em]" },
} as const;

export function Wordmark({ size = "md", className = "", asText = false, inverted = false }: WordmarkProps) {
  const s = SIZES[size];
  const solid = inverted ? "#FBF9F5" : "#14181d";

  const inner = (
    <span
      className={`inline-flex max-w-full items-baseline ${s.wrap} ${s.gap} ${s.track} whitespace-nowrap font-ui font-extrabold uppercase leading-[0.84] ${className}`}
    >
      <span
        style={{
          color: "transparent",
          WebkitTextStroke: `1.6px ${solid}`,
          paintOrder: "stroke fill",
        }}
      >
        Not
      </span>
      <span style={{ color: solid }}>Scripted</span>
      <span
        aria-hidden="true"
        className="inline-block h-[0.1em] w-[0.1em] min-w-[5px] translate-y-[0.04em] rounded-[1px] bg-brand"
      />
    </span>
  );

  if (asText) return inner;
  return (
    <Link href="/" aria-label="NOT SCRIPTED — home" className="inline-block">
      <span className="sr-only">NOT SCRIPTED</span>
      {inner}
    </Link>
  );
}