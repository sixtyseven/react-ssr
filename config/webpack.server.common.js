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
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      { test: /\.(s[ca]ss|css)$/, loader: "null-loader" },
    ],
  },

  plugins: [new CleanWebpackPlugin()],

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
