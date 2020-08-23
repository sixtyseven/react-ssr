"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const webpack = require("webpack");
const serverConfig = require("../config/webpack.server.common");
const clientConfig = require("../config/webpack.client.common");
const chalk = require("chalk");

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(clientConfig);

build();
let compiled = {
  server: false,
  client: false,
};
function build() {
  serverCompiler.run((err, stats) => {
    compileHandler(err, stats, "server");
  });
  clientCompiler.run((err, stats) => {
    compileHandler(err, stats, "client");
  });
}

function compileHandler(err, stats, type) {
  if (err || stats.hasErrors()) {
    console.error(chalk.red(`[${type} compile error]`), err, stats.toString());
    return;
  }
  if (stats.hasWarnings()) {
    console.error(
      chalk.yellowBright(`[${type} compile warning]`),
      err,
      stats.toString()
    );
  }

  console.log(chalk.green(`[${type} compile success]`));
  compiled[type] = true;
  if (compiled.server && compiled.client) {
    console.log(chalk.green(`[build success!!!]`));
  }
}
