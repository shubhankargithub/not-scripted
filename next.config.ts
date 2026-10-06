import type { NextConfig } from "next";

/**
 * NOT SCRIPTED builds as a fully static site. There is no server runtime, no
 * database and no API: every route is prerendered at build time into plain
 * HTML, CSS, JS and images, which is what GitHub Pages serves.
 *
 * `NEXT_OUTPUT=node` restores the default Node server build for local work.
 */
const staticExport = process.env.NEXT_OUTPUT !== "node";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      trailingSlash: true,
    };

export default nextConfig;