"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const webpack = require("webpack");
const chalk = require("chalk");
const browserSync = require("browser-sync");
const childProcess = require("child_process");

const serverConfig = require("../config/webpack.server.dev");
const clientConfig = require("../config/webpack.client.dev");

const serverCompiler = webpack(serverConfig);
const port = process.env.PORT || 3030;

start();

function start() {
  runScript("./dev-server-build/index.js", (err) => {
    if (err) {
      console.error(chalk.red("[runScript]"), err);
      throw err;
    }
  });

  initBrowserSync();

  serverCompiler.watch({}, (err, stats) => {
    if (err || stats.hasErrors()) {
      // Handle errors here
      console.error(
        chalk.red("[compile server] webpack server compile error"),
        error
      );
    }

    console.log(chalk.green("[compile server] success"));
    if (browserSync) {
      browserSync.reload();
      console.log(chalk.green("[browserSync] Reload Browser"));
    }
  });

  const clientCompiler = webpack(clientConfig);
  clientCompiler.watch({}, (err, stats) => {
    if (err || stats.hasErrors()) {
      // Handle errors here
      console.error(
        chalk.red("[compile client] webpack client compile error"),
        error
      );
    }

    console.log(chalk.green("[compile client] success"));
    if (browserSync) {
      browserSync.reload();
      console.log(chalk.green("[browserSync] Reload Browser"));
    }
  });
}

function runScript(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent
  // multiple invocations
  let invoked = false;

  const process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on("error", function (err) {
    console.log("process error");
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on("exit", function (code) {
    console.log("process exit");
    if (invoked) return;
    invoked = true;
    const err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
  });

  process.on("SIGINT", function () {
    console.log("process SIGINT");
    process.exit();
  });

  return process;
}

function initBrowserSync(cb) {
  console.log(chalk.green("[initBrowserSync]"), port);
  browserSync.init(
    null,
    {
      proxy: `http://localhost:${port}`,
      files: [],
      browser: "google chrome",
      port: parseInt(port) + 1,
    },
    cb
  );
}
