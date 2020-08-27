const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { APP_DIST_FOLDER } = require("./appPath");

const isDevelopment = process.env.NODE_ENV === "development";

const outputPath = isDevelopment
  ? path.resolve(APP_DIST_FOLDER.distServerDev)
  : path.resolve(APP_DIST_FOLDER.distServerProd);

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/server/index.js",

  target: "node",

  externals: [nodeExternals()],

  output: {
    path: outputPath,
    filename: "index.js",
  },
  devtool: isDevelopment ? "eval-cheap-source-map" : "none",

  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: {
          loader: "babel-loader",
        },
        include: [path.resolve("src"), path.resolve("config")],
      },
      { test: /\.(s[ca]ss|css)$/, loader: "null-loader" },
    ],
  },

  plugins: [new CleanWebpackPlugin()],

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    symlinks: false,
  },
};
