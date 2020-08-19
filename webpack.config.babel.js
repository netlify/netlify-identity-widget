import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import postCSSImport from "postcss-import";
import postCSSNested from "postcss-nested";
import postCSSNext from "postcss-cssnext";
import path from "path";

const ENV = process.env.NODE_ENV || "development";
const isProduction = ENV === "production";
const CSS_MAPS = !isProduction;

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: isProduction ? "production" : "development",
  entry: {
    "netlify-identity-widget": "./index.js"
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js"
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, "src"),
        enforce: "pre",
        use: "source-map-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /(micro-api-client|lodash)/,
        use: "babel-loader"
      },
      {
        // Transform our own .(less|css) files with PostCSS and CSS-modules
        test: /\.(css)$/,
        include: [path.resolve(__dirname, "src/components")],
        use: [
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          {
            loader: `postcss-loader`,
            options: {
              sourceMap: CSS_MAPS,
              plugins: () => [postCSSImport(), postCSSNested(), postCSSNext()]
            }
          }
        ]
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: " r"
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: isProduction ? "file-loader" : "url-loader"
      }
    ]
  },
  // See the other webpack config before changing the order of plugins.
  // They modify the plugins array by index
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: "./index.ejs",
      inject: false,
      minify: { collapseWhitespace: true }
    }),
    new HtmlWebpackPlugin({
      filename: "foo.html",
      template: "./foo.ejs",
      inject: false,
      minify: { collapseWhitespace: true }
    })
  ],

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",

  devServer: {
    port: process.env.PORT || 8080,
    host: "localhost",
    publicPath: "/",
    contentBase: "./src",
    historyApiFallback: true,
    open: true,
    openPage: "",
    proxy: {
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    }
  }
};
