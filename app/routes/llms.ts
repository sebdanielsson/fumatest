import { source } from '@/lib/source';

export const revalidate = false;

export async function loader() {
  const scanned: string[] = [];
  scanned.push('# Docs');

  // Flatten all pages into a single list for now
  const allPages: string[] = [];

  // Get all pages and sort them by depth (less nested first), then alphabetically
  const pages = source.getPages().sort((a, b) => {
    // First sort by depth (number of segments in the URL)
    const depthA = a.url.split('/').length;
    const depthB = b.url.split('/').length;

    if (depthA !== depthB) {
      return depthA - depthB;
    }

    // If same depth, sort alphabetically by URL
    return a.url.localeCompare(b.url);
  });

  for (const page of pages) {
    // Clean up description by removing line breaks and extra whitespace
    const cleanDescription =
      page.data.description?.replace(/\s+/g, ' ').trim() || '';
    allPages.push(`- [${page.data.title}](${page.url}): ${cleanDescription}`);
  }

  scanned.push(allPages.join('\n'));

  return new Response(scanned.join('\n\n'));
}
