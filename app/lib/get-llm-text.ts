import fs from 'node:fs/promises';
import type { InferPageType } from 'fumadocs-core/source';
import { remarkInclude } from 'fumadocs-mdx/config';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import type { source } from '@/lib/source';

function stripFrontmatter(content: string): string {
  const frontmatterRegex = /^---\s*\n.*?\n---\s*\n/s;
  return content.replace(frontmatterRegex, '');
}

const processor = remark().use(remarkMdx).use(remarkInclude).use(remarkGfm);

export async function getLLMText(page: InferPageType<typeof source>) {
  const rawContent = await fs.readFile(page.absolutePath, 'utf-8');
  const content = stripFrontmatter(rawContent);
  const processed = await processor.process({
    path: page.absolutePath,
    value: content,
  });

  // note: it doesn't escape frontmatter, it's up to you.
  return `# ${page.data.title}
URL: ${page.url}

${processed.value}`;
}
