const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const outputPath =
  process.env.NODE_ENV === "development"
    ? path.resolve("dist-server-dev")
    : path.resolve("dist-server");

module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
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
