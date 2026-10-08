"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PHOTOS } from "@/content/photos";
import { CATEGORY_MAP } from "@/lib/articles";

/**
 * Instagram sharing for article and standing pages.
 *
 * Isolated by design: this is the only module on the site that knows about
 * Instagram. It is mounted from ArticlePage and from the standing pages about
 * Chavan Industrial Group and the Central Railway order. The graphic is drawn on
 * demand into an off-screen canvas, so it adds nothing to page load.
 *
 * Nothing is published automatically, no credentials are involved, and the
 * final post is always the reader's own action through the platform share sheet
 * or the manual fallback.
 */

type Format = "story" | "feed" | "message";

interface FormatSpec {
  w: number;
  h: number;
  label: string;
  hint: string;
  file: string;
}

const FORMATS: Record<Format, FormatSpec> = {
  story: { w: 1080, h: 1920, label: "Story / Reel", hint: "1080 × 1920 · 9:16", file: "not-scripted-story.png" },
  feed: { w: 1080, h: 1350, label: "Feed post", hint: "1080 × 1350 · 4:5", file: "not-scripted-feed.png" },
  message: { w: 1080, h: 1350, label: "Direct message", hint: "1080 × 1350 · high quality", file: "not-scripted-message.png" },
};

const PAPER = "#FBF9F5";
const INK = "#14181D";
const INK2 = "#333B43";
const INK4 = "#8B949D";
const RULE = "#DDD8CE";
const BRAND = "#C21F17";

interface Props {
  /**
   * Photo-register key. It is also the seed for the generated brand artwork, so
   * a page with no photograph still gets a distinct, stable graphic.
   */
  slug: string;
  headline: string;
  dek: string;
  category: string;
  /**
   * Omitted on standing pages that were never "published" on a date, so the
   * graphic shows the desk on its own rather than a date that would be false.
   */
  publishedAt?: string;
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
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

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function splitOverlong(ctx: CanvasRenderingContext2D, word: string, maxWidth: number): string[] {
  const parts: string[] = [];
  let chunk = "";
  for (const ch of word) {
    if (ctx.measureText(chunk + ch).width > maxWidth && chunk) {
      parts.push(chunk);
      chunk = ch;
    } else {
      chunk += ch;
    }
  }
  if (chunk) parts.push(chunk);
  return parts;
}

/** Word-wrap that also breaks any single word too long to fit the column. */
function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const out: string[] = [];
  for (const paragraph of text.split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (!words.length) continue;
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width <= maxWidth) {
        line = test;
        continue;
      }
      if (line) {
        out.push(line);
        line = "";
      }
      if (ctx.measureText(word).width <= maxWidth) {
        line = word;
        continue;
      }
      const parts = splitOverlong(ctx, word, maxWidth);
      out.push(...parts.slice(0, -1));
      line = parts[parts.length - 1] ?? "";
    }
    if (line) out.push(line);
  }
  return out;
}

/** Shrink the headline until the wrapped block fits the space available. */
function fitBlock(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  family: string,
  start: number,
  min: number,
): { lines: string[]; lineHeight: number } {
  for (let size = start; size >= min; size -= 2) {
    const ratio = 1.12;
    ctx.font = `700 ${size}px ${family}`;
    const lines = wrapLines(ctx, text, maxWidth);
    const lineHeight = size * ratio;
    if (lines.length * lineHeight <= maxHeight) return { lines, lineHeight };
  }
  ctx.font = `700 ${min}px ${family}`;
  const lineHeight = min * 1.12;
  const lines = wrapLines(ctx, text, maxWidth);
  const maxLines = Math.max(1, Math.floor(maxHeight / lineHeight));
  return { lines: lines.slice(0, maxLines), lineHeight };
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) {
  const ir = img.naturalWidth / img.naturalHeight;
  const br = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (ir > br) {
    sw = img.naturalHeight * br;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / br;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.save();
  roundRect(ctx, x, y, w, h, radius);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  ctx.restore();
}

/** Brand panel drawn when the story has no licensed photograph. */
function drawBrandPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  seed: number,
  accent: string,
  hue: string,
) {
  const rnd = mulberry(seed);
  ctx.save();
  roundRect(ctx, x, y, w, h, 18);
  ctx.clip();
  ctx.fillStyle = hue;
  ctx.fillRect(x, y, w, h);
  const motif = seed % 6;

  if (motif === 0) {
    const cx = x + w * (0.34 + rnd() * 0.3);
    const cy = y + h * (0.4 + rnd() * 0.2);
    for (let i = 4; i >= 1; i -= 1) {
      ctx.beginPath();
      ctx.arc(cx, cy, (Math.min(w, h) / 2.1) * (i / 4), 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? accent : hue;
      ctx.globalAlpha = i % 2 === 0 ? 0.9 : 0.75;
      ctx.fill();
    }
  } else if (motif === 2) {
    const n = 7;
    const gap = 8;
    const bw = (w - gap * (n - 1)) / n;
    for (let i = 0; i < n; i += 1) {
      const t = i / (n - 1);
      const bh = h * (0.2 + 0.7 * Math.abs(Math.sin(t * 3.1)));
      ctx.fillStyle = i === Math.floor(n / 2) ? accent : INK;
      ctx.globalAlpha = i === Math.floor(n / 2) ? 1 : 0.22;
      ctx.fillRect(x + i * (bw + gap), y + h - bh, bw, bh);
    }
  } else if (motif === 5) {
    const cols = 7;
    const rows = 4;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const v = rnd();
        if (v < 0.52) continue;
        const rad = (Math.min(w / cols, h / rows) / 2) * (0.34 + 0.56 * v);
        ctx.beginPath();
        ctx.arc(x + ((c + 0.5) * w) / cols, y + ((r + 0.5) * h) / rows, rad, 0, Math.PI * 2);
        ctx.fillStyle = v > 0.9 ? accent : INK;
        ctx.globalAlpha = v > 0.9 ? 1 : 0.26;
        ctx.fill();
      }
    }
  } else {
    const rows = 6;
    const rh = h / rows;
    for (let i = 0; i < rows; i += 1) {
      const t = i / rows;
      ctx.fillStyle = i % 5 === 0 ? accent : INK;
      ctx.globalAlpha = i % 5 === 0 ? 1 : 0.24;
      ctx.fillRect(
        x + w * 0.06,
        y + i * rh + rh * 0.24,
        w * (0.24 + 0.7 * (0.5 + 0.5 * Math.sin(t * 6.2))),
        rh * 0.42,
      );
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "sync";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image failed"));
    img.src = src;
  });
}

/** Reuse the site's own typefaces so the graphic matches the publication. */
async function resolveFonts(): Promise<{ serif: string; sans: string }> {
  const serif = getComputedStyle(document.body).fontFamily || "Georgia, serif";
  let sans = "Arial, Helvetica, sans-serif";
  const probe = document.createElement("span");
  probe.className = "font-ui";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const fam = getComputedStyle(probe).fontFamily;
  if (fam) sans = fam;
  probe.remove();
  try {
    await document.fonts.load(`700 64px ${serif}`);
    await document.fonts.load(`800 64px ${sans}`);
    await document.fonts.ready;
  } catch {
    /* whatever is available will do */
  }
  return { serif, sans };
}

function drawWordmark(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, sans: string) {
  ctx.save();
  ctx.font = `800 ${size}px ${sans}`;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  const gap = size * 0.18;
  const dot = size * 0.11;
  ctx.letterSpacing = `${-size * 0.03}px`;
  const wNot = ctx.measureText("NOT").width;
  const wScripted = ctx.measureText("SCRIPTED").width;

  ctx.strokeStyle = INK;
  ctx.lineWidth = Math.max(1.5, size * 0.022);
  ctx.strokeText("NOT", x, y);
  ctx.fillStyle = INK;
  ctx.fillText("SCRIPTED", x + wNot + gap, y);
  ctx.fillStyle = BRAND;
  ctx.fillRect(x + wNot + gap + wScripted + gap, y - dot * 0.78, dot, dot);
  ctx.letterSpacing = "0px";
  ctx.restore();
}

async function renderGraphic(
  format: Format,
  data: Props,
  canvas: HTMLCanvasElement,
): Promise<Blob | null> {
  const spec = FORMATS[format];
  canvas.width = spec.w;
  canvas.height = spec.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const { serif, sans } = await resolveFonts();
  const cat = CATEGORY_MAP[data.category];
  const catName = cat?.name ?? data.category;
  const accent = cat?.accent ?? BRAND;
  const hue = cat?.hue ?? "#EADFD2";

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, spec.w, spec.h);
  ctx.fillStyle = BRAND;
  ctx.fillRect(0, 0, spec.w, 14);

  const pad = 64;
  const inner = spec.w - pad * 2;

  drawWordmark(ctx, pad, 96, 54, sans);

  let y = 142;
  ctx.font = `600 26px ${sans}`;
  ctx.fillStyle = INK4;
  ctx.textAlign = "left";
  ctx.letterSpacing = "2px";
  ctx.fillText(
    data.publishedAt ? `${catName.toUpperCase()}   ·   ${data.publishedAt}` : catName.toUpperCase(),
    pad,
    y,
  );
  ctx.letterSpacing = "0px";

  y += 30;
  ctx.strokeStyle = RULE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, y);
  ctx.lineTo(spec.w - pad, y);
  ctx.stroke();

  const isStory = format === "story";
  const imgH = isStory ? 780 : 660;
  const imgY = y + 34;
  const photo = PHOTOS[data.slug];

  if (photo) {
    const sources = [1400, 800, 400].map((w) => `${photo.base}-${w}.jpg`);
    let img: HTMLImageElement | null = null;
    for (const src of sources) {
      try {
        img = await loadImage(src);
        break;
      } catch {
        img = null;
      }
    }
    if (img) drawCover(ctx, img, pad, imgY, inner, imgH, 18);
    else drawBrandPanel(ctx, pad, imgY, inner, imgH, hash(data.slug), accent, hue);
  } else {
    drawBrandPanel(ctx, pad, imgY, inner, imgH, hash(data.slug), accent, hue);
  }

  let ty = imgY + imgH + 52;

if (data.dek) {
    ctx.font = `400 30px ${serif}`;
    const dekMax = isStory ? 3 : 2;
    const all = wrapLines(ctx, data.dek, inner);
    const shown = all.slice(0, dekMax);
    const cut = all.length > dekMax;
    ctx.fillStyle = INK2;
    shown.forEach((line, i) => {
      const last = i === shown.length - 1 && cut;
      const text = last ? `${line.replace(/[ ,;:.]$/, "")}…` : line;
      ctx.fillText(text, pad, ty + i * 42);
    });
    ty += shown.length * 42 + 32;
  }

  const footerY = spec.h - 96;
  const headMax = Math.max(120, footerY - 56 - ty);
  const { lines, lineHeight } = fitBlock(ctx, data.headline, inner, headMax, serif, isStory ? 76 : 66, 30);
  ctx.fillStyle = INK;
  lines.forEach((line, i) => ctx.fillText(line, pad, ty + 28 + i * lineHeight));

  ctx.strokeStyle = INK;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(pad, footerY - 40);
  ctx.lineTo(spec.w - pad, footerY - 40);
  ctx.stroke();

  ctx.font = `600 26px ${sans}`;
  ctx.letterSpacing = "1px";
  ctx.fillStyle = INK;
  ctx.textAlign = "left";
  ctx.fillText("notscripted.in", pad, footerY);
  ctx.fillStyle = INK4;
  ctx.textAlign = "right";
  ctx.fillText(`NOT SCRIPTED  ·  ${catName.toUpperCase()}`, spec.w - pad, footerY);
  ctx.letterSpacing = "0px";
  ctx.textAlign = "left";

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
}

export function InstagramShare(props: Props) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<Format>("story");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blobRef = useRef<Blob | null>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const generate = useCallback(
    async (fmt: Format): Promise<Blob | null> => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      setBusy(true);
      setStatus("Preparing graphic…");
      try {
        const blob = await renderGraphic(fmt, props, canvas);
        blobRef.current = blob;
        setReady(Boolean(blob));
        if (blob) {
          if (previewRef.current) URL.revokeObjectURL(previewRef.current);
          const url = URL.createObjectURL(blob);
          previewRef.current = url;
          setPreview(url);
          setStatus("Ready.");
        } else {
          setStatus("Could not build the graphic on this device.");
        }
        return blob;
      } catch {
        setStatus("Could not build the graphic on this device.");
        return null;
      } finally {
        setBusy(false);
      }
    },
    [props],
  );

  const onToggle = useCallback(() => {
    if (open) {
      setOpen(false);
      setStatus("");
      return;
    }
    setOpen(true);
    void generate(format);
  }, [open, format, generate]);

  const onPickFormat = useCallback(
    (f: Format) => {
      setFormat(f);
      void generate(f);
    },
    [generate],
  );

  const onShare = useCallback(async () => {
    let blob = blobRef.current;
    if (!blob) blob = await generate(format);
    if (!blob) return;

    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${props.headline}\n\n${url}`;
    const shareData = { title: props.headline, text, url };

    const hasShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

    let file: File | null = null;
    try {
      file = new File([blob], FORMATS[format].file, { type: "image/png" });
    } catch {
      file = null;
    }

    const canShareFiles =
      hasShare &&
      !!file &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] });

    if (canShareFiles) {
      try {
        await navigator.share({ files: [file as File], ...shareData });
        setStatus("Handed to your share sheet.");
        return;
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
      }
    }

    if (hasShare) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
      }
    }

    setStatus("This browser offers no share sheet. Use the options below to post it yourself.");
  }, [format, generate, props.headline]);

  const onDownload = useCallback(() => {
    const blob = blobRef.current;
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = FORMATS[format].file;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    setStatus("Saved. Attach it to your Instagram post, Story or message.");
  }, [format]);

  const onCopy = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Article link copied.");
    } catch {
      setStatus(url);
    }
  }, []);

  const nativeShareable = typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <>
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="instagram-share-panel"
        className="fixed bottom-4 right-4 z-40 inline-flex min-h-[44px] items-center gap-2 border border-rule-2 bg-paper px-3 py-2.5 shadow-[0_2px_12px_rgba(20,24,29,0.18)] transition-colors hover:border-ink sm:bottom-6 sm:right-6"
      >
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
        >
          <span className="block h-[11px] w-[11px] rounded-[3px] border-[1.6px] border-white" />
        </span>
        <span className="label-ui text-ink">Share</span>
      </button>

      {open ? (
        <div
          id="instagram-share-panel"
          role="dialog"
          aria-label="Share this story to Instagram"
          className="fixed bottom-20 right-4 z-40 max-h-[calc(100vh-7.5rem)] w-[min(21rem,calc(100vw-2rem))] overflow-y-auto border border-rule bg-paper shadow-[0_10px_40px_rgba(20,24,29,0.25)] sm:bottom-24 sm:right-6"
        >
          <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
            <p className="label-ui text-ink">Share to Instagram</p>
            <button type="button" onClick={() => setOpen(false)} className="label-ui text-ink-4 hover:text-ink">
              Close
            </button>
          </div>

          <div className="px-4 py-3">
            <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Graphic format">
              {(Object.keys(FORMATS) as Format[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={format === f}
                  onClick={() => onPickFormat(f)}
                  className={`label-ui border px-2 py-2 text-center transition-colors ${
                    format === f ? "border-ink bg-ink text-paper" : "border-rule text-ink-3 hover:border-ink"
                  }`}
                >
                  {FORMATS[f].label}
                  <span className="mt-1 block text-[8.5px] font-normal tracking-normal opacity-70">
                    {FORMATS[f].hint}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center border border-rule bg-paper-2/60 p-2">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Preview of the generated story graphic" className="max-h-56 w-auto" />
              ) : (
                <div className="flex h-56 w-full items-center justify-center font-ui text-xs text-ink-4">
                  {busy ? "Building graphic…" : "Preview appears here"}
                </div>
              )}
            </div>

            <div className="mt-3 grid gap-1.5">
              <button
                type="button"
                onClick={onShare}
                disabled={busy}
                className="label-ui bg-brand px-4 py-3 text-paper transition-colors hover:bg-brand-2 disabled:opacity-60"
              >
                Share via your apps
              </button>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={onDownload}
                  disabled={busy || !ready}
                  className="label-ui border border-rule px-3 py-2.5 text-ink transition-colors hover:border-ink disabled:opacity-60"
                >
                  Download
                </button>
                <button
                  type="button"
                  onClick={onCopy}
                  className="label-ui border border-rule px-3 py-2.5 text-ink transition-colors hover:border-ink"
                >
                  Copy link
                </button>
              </div>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="label-ui border border-rule px-3 py-2.5 text-center text-ink transition-colors hover:border-ink"
              >
                Open Instagram
              </a>
            </div>

            <p className="mt-2.5 font-ui text-[0.7rem] leading-relaxed text-ink-4">
              {nativeShareable
                ? "Your device will ask which app to use. Instagram appears there if it is installed. Nothing is posted without you."
                : "This browser does not offer a share sheet. Download the graphic, then post it to Instagram yourself."}{" "}
              Nothing is published automatically and no account details are needed.
            </p>
            {status ? <p className="mt-1.5 font-ui text-[0.7rem] text-ink-3">{status}</p> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}