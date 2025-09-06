import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('docs/*', 'docs/page.tsx'),
  route('llms-full.txt', 'routes/llms-full.ts'),
  route('llms.txt', 'routes/llms.ts'),
  route('api/search', 'docs/search.ts'),
] satisfies RouteConfig;
