const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { APP_DIST_FOLDER } = require("./appPath");

const isDevelopment = process.env.NODE_ENV === "development";

const outputPath = isDevelopment
  ? path.resolve(APP_DIST_FOLDER.distDev)
  : path.resolve(APP_DIST_FOLDER.distProd);

const config = {
  mode: "production", // for both ssr dev and production
  entry: {
    app: ["./src/index.js"],
  },
  output: {
    path: path.join(outputPath, "static"),
    filename: "[name].js",
  },
  // or source-map for production,
  // but should configure server to disallow access to
  // the Source Map file for normal users!
  devtool: isDevelopment ? "eval-cheap-source-map" : "none",
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: {
          loader: "babel-loader",
        },
        include: path.resolve("src"),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
        include: path.resolve("src"),
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      minify: !isDevelopment,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    symlinks: false,
  },
};

module.exports = config;
