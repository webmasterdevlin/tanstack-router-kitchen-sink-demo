import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), alias({
    entries: [
      {
        find: '@',
        replacement: resolve(projectRootDir, 'src')
      }
    ]
  })],
});
