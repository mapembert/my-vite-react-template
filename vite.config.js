import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
// import path from 'path';
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  return {
    server: {
      open: true, // Automatically open the browser
      port: 3000, // Match CRA's default port (optional)
    },
    esbuild: {
        loader: "jsx",
        // loader: { '.js': 'jsx' },
        // include: /src\/.*\.jsx?$/,
        include: /src\/.*\.js$/,
        // loader: "tsx",
        // include: /src\/.*\.[tj]sx?$/,
        exclude: [],
    },
    envPrefix: "REACT_",
    define: {
      'process.env': {
        "REACT_APP_INSTANCE_ID": "-1",
        "REACT_APP_TRIRIGA_URL": "http://localhost:9080",
        "REACT_APP_TRIRIGA_DEPLOY_URL": "http://localhost:9080",
        "REACT_APP_CONTEXT_PATH": "/",
        "REACT_APP_MODEL_AND_VIEW": "triviteTemplate",
        "REACT_APP_EXPOSED_NAME": "triviteTemplate",
        "REACT_APP_TRIRIGA_OAUTH_PROFILE_NAME": "",
        "REACT_APP_SSO": "false",
        "TRIRIGA_USER": "system",
        "TRIRIGA_PASSWORD": "badadmin",
        "BROWSER": "none"
      },
    },
    build: {
      outDir: 'build',
    },
    resolve: {
        alias: [
            {
                // this is required for the SCSS modules
                find: /^~(.*)$/,
                replacement: '$1',
            },
        ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'legacy', // Retain legacy API if required by your setup
          additionalData: `@use "@carbon/react/scss/themes" as *;`
        },
      },
    },

    optimizeDeps: {
        exclude: ['@tririga/react-components'], // Exclude Tririga components
        esbuildOptions: {
          plugins: [
            {
              name: "load-js-files-as-jsx",
              setup(build) {
                build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                  loader: "jsx",
                  contents: await fs.readFile(args.path, "utf8"),
                }));
              },
            },
          ],
        },
      },
    plugins: [react(), svgr()],
  };
});
