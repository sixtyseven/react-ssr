const path = require("path");
const nodeExternals = require("webpack-node-externals");
const APP_PATH = require("./appPath");

console.log("APP_PATH ", APP_PATH);

module.exports = {
  mode: "development",
  entry: APP_PATH.server.entry,

  target: "node",

  externals: [nodeExternals()],

  output: {
    path: path.resolve("dev-server-build"),
    filename: "index.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
