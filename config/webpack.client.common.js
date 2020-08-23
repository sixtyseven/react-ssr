const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

const outputPath = isDevelopment
  ? path.resolve("dist-dev")
  : path.resolve("dist");

const plugins = [];
if (!isDevelopment) {
  plugins.push(new CleanWebpackPlugin());
}

const config = {
  mode: "production", // for both ssr dev and production
  entry: {
    app: ["./src/index.js"],
  },
  output: {
    path: outputPath,
    filename: "[name].js",
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
  plugins: plugins,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", ".scss"],
  },
};

module.exports = config;
