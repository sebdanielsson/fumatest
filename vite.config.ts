import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as MdxConfig from './source.config';

export default defineConfig({
  plugins: [mdx(MdxConfig), tailwindcss(), reactRouter(), tsconfigPaths()],
});
