/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import { babel } from "@rollup/plugin-babel";

const isLibBuild = process.env.BUILD_MODE === "lib";

export default defineConfig({
  plugins: [
    // Babel for JSX (Preact) and TypeScript
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      include: ["src/**/*"],
      babelrc: false,
      configFile: false,
      presets: [
        [
          "@babel/preset-env",
          { targets: { browsers: ["defaults", "not IE 11"] } }
        ],
        "@babel/preset-typescript"
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-transform-class-properties", { loose: true }],
        ["@babel/plugin-transform-private-methods", { loose: true }],
        ["@babel/plugin-transform-private-property-in-object", { loose: true }],
        [
          "@babel/plugin-transform-react-jsx",
          { pragma: "h", pragmaFrag: "Fragment" }
        ]
      ]
    })
  ],
  css: {
    postcss: "./postcss.config.js"
  },
  esbuild: {
    // Tell esbuild to handle JSX in .js/.ts/.tsx files during dev
    loader: "tsx",
    include: /src\/.*\.(js|ts|tsx)$/,
    jsxFactory: "h",
    jsxFragment: "Fragment"
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
        ".tsx": "tsx"
      }
    }
  },
  build: isLibBuild
    ? {
        lib: {
          entry: resolve(__dirname, "src/netlify-identity.tsx"),
          name: "netlifyIdentity",
          formats: ["umd"],
          fileName: () => "netlify-identity.js"
        },
        outDir: "build",
        sourcemap: true,
        minify: "terser"
      }
    : {
        outDir: "build",
        sourcemap: true,
        rollupOptions: {
          input: {
            main: resolve(__dirname, "index.html"),
            foo: resolve(__dirname, "foo.html")
          }
        }
      },
  server: {
    port: 8080,
    open: true
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
});
