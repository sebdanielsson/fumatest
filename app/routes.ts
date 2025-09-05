import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('docs/*', 'docs/page.tsx'),
  route('docs/llms-full.txt', 'routes/llms-full.ts'),
  route('api/search', 'docs/search.ts'),
] satisfies RouteConfig;
