import { defineConfig } from "vite";
import { resolve } from "path";
import { babel } from "@rollup/plugin-babel";

const isLibBuild = process.env.BUILD_MODE === "lib";

export default defineConfig({
  plugins: [
    // Babel for JSX (Preact 8 h pragma) and MobX decorators
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx"],
      include: ["src/**/*"],
      babelrc: false,
      configFile: false,
      presets: [["@babel/preset-env", { targets: { browsers: ["ie >= 11"] } }]],
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-transform-class-properties", { loose: true }],
        ["@babel/plugin-transform-private-methods", { loose: true }],
        ["@babel/plugin-transform-private-property-in-object", { loose: true }],
        ["@babel/plugin-transform-react-jsx", { pragma: "h" }]
      ]
    })
  ],
  css: {
    postcss: "./postcss.config.js"
  },
  build: isLibBuild
    ? {
        lib: {
          entry: resolve(__dirname, "src/netlify-identity.js"),
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
  }
});
