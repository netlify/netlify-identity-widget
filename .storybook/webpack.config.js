const path = require("path");

module.exports = {
  resolve: {
    extensions: [".jsx", ".js", ".json"],
    modules: [
      path.resolve(__dirname, "../src/lib"),
      path.resolve(__dirname, "../node_modules"),
      "node_modules"
    ],
    alias: {
      components: path.resolve(__dirname, "../src/components"), // used for tests
      style: path.resolve(__dirname, "../src/style"),
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  }
};
