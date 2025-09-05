import { glob } from 'node:fs/promises';
import type { Config } from '@react-router/dev/config';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';

const getUrl = createGetUrl('/docs');

export default {
  ssr: true,
  async prerender({ getStaticPaths }) {
    const paths: string[] = [];
    for (const path of getStaticPaths()) {
      // ignore dynamic document search
      if (path === '/api/search') continue;
      paths.push(path);
    }

    for await (const entry of glob('**/*.mdx', { cwd: 'content/docs' })) {
      paths.push(getUrl(getSlugs(entry)));
    }

    paths.push('/docs/llms-full.txt');

    return paths;
  },
} satisfies Config;
