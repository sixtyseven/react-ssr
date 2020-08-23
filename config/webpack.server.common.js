const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { APP_DIST_FOLDER } = require("./appPath");

const isDevelop = process.env.NODE_ENV === "development";

const outputPath = isDevelop
  ? path.resolve(APP_DIST_FOLDER.distServerDev)
  : path.resolve(APP_DIST_FOLDER.distServerProd);

module.exports = {
  mode: isDevelop ? "development" : "production",
  entry: "./src/server/index.js",

  target: "node",

  externals: [nodeExternals()],

  output: {
    path: outputPath,
    filename: "index.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [new CleanWebpackPlugin()],

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
