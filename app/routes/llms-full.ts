import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export async function loader() {
  // Sort pages by depth (less nested first), then alphabetically
  const sortedPages = source.getPages().sort((a, b) => {
    // First sort by depth (number of segments in the URL)
    const depthA = a.url.split('/').length;
    const depthB = b.url.split('/').length;

    if (depthA !== depthB) {
      return depthA - depthB;
    }

    // If same depth, sort alphabetically by URL
    return a.url.localeCompare(b.url);
  });

  const scan = sortedPages.map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}
