import type { PageTree } from 'fumadocs-core/server';
import { toClientRenderer } from 'fumadocs-mdx/runtime/vite';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { docs } from '../../source.generated';
import type { Route } from './+types/page';

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw new Response('Not found', { status: 404 });

  return {
    path: page.path,
    url: page.url,
    tree: source.pageTree,
  };
}

const renderer = toClientRenderer(
  docs.doc,
  (
    { toc, default: Mdx, frontmatter },
    { url, path }: { url: string; path: string },
  ) => {
    return (
      <DocsPage toc={toc}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
          <LLMCopyButton markdownUrl={`docs${url}.mdx`} />
          <ViewOptions
            markdownUrl={`${url}.mdx`}
            githubUrl={`https://github.com/sebdanielsson/fumatest/blob/main/content/docs/${path}`}
          />
        </div>
        <DocsBody>
          <Mdx components={{ ...defaultMdxComponents }} />
        </DocsBody>
      </DocsPage>
    );
  },
);

export default function Page(props: Route.ComponentProps) {
  const { tree, path, url } = props.loaderData;
  const Content = renderer[path];

  return (
    <DocsLayout {...baseOptions()} tree={tree as PageTree.Root}>
      <Content url={url} path={path} />
    </DocsLayout>
  );
}
