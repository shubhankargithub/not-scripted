/**
 * Emits one JSON-LD block for a page.
 *
 * Every route renders exactly one `<script type="application/ld+json">` for its
 * own graph, and the site-level publisher graph is emitted once in the root
 * layout. Nodes are tied together with `@id` references, so the two blocks
 * describe a single connected graph rather than competing definitions.
 */
export function SeoJsonLd({ nodes }: { nodes: object[] }) {
  if (nodes.length === 0) return null;

  const graph = { "@context": "https://schema.org", "@graph": nodes };

  // `</script>` inside a string value would close the tag early, so escape the
  // few characters that can break out of the script element.
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}