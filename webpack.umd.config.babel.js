import baseConfig from "./webpack.config.babel.js";
import path from "path";

const umdConfig = Object.assign({}, baseConfig, {
  entry: {
    "netlify-identity": "./netlify-identity.js"
  },

  output: {
    globalObject: "this",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
    library: "netlifyIdentity",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  devtool: "source-map"
});

umdConfig.plugins.splice(2, 1); // Remove html plugin

module.exports = umdConfig;
