import baseConfig from "./webpack.config.babel.js";
import path from "path";

const umdConfig = Object.assign({}, baseConfig, {
  entry: {
    "netlify-identity-dev": "./netlify-identity.js"
  }
});

umdConfig.plugins.splice(2,1) // Remove html plugin

module.exports = umdConfig;
