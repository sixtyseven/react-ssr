"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const webpack = require("webpack");
const chalk = require("chalk");
const browserSync = require("browser-sync");
const nodemon = require("nodemon");

const serverConfig = require("../config/webpack.server.common");
const clientConfig = require("../config/webpack.client.common");
const { APP_DIST_FOLDER } = require("../config/appPath");

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(clientConfig);
const port = process.env.PORT || 3030;

start();

function start() {
  let inited = false;
  let compiled = {
    server: false,
    client: false,
  };

  const init = () => {
    nodemon({
      script: `./${APP_DIST_FOLDER.distServerDev}/index.js`,
      ext: "js",
      watch: [
        `${APP_DIST_FOLDER.distServerDev}`,
        // `${APP_DIST_FOLDER.distDev}/static/index.html`,
      ],
    });
    nodemon
      .on("start", function () {
        if (!inited) {
          console.log(chalk.green("Nodemon has started"));
          inited = true;
        }
      })
      .on("quit", function () {
        console.log(chalk.green("Nodemon has quit"));
        process.exit();
      })
      .on("restart", function (files) {
        console.log(chalk.green("Nodemon restarted due to: "), files);
      });

    compiled = {
      server: false,
      client: false,
    };

    initBrowserSync();
  };
  serverCompiler.watch({}, (err, stats) => {
    if (err || stats.hasErrors()) {
      // Handle errors here

      err = err || stats.toString();
      console.error(
        chalk.red("[compile server] webpack server compile error"),
        err
      );
    }

    console.log(chalk.green("[compile server] success"));
    compiled.server = true;
  });

  clientCompiler.watch({}, (err, stats) => {
    if (err || stats.hasErrors()) {
      // Handle errors here
      err = err || stats.toString();
      console.error(
        chalk.red("[compile client] webpack client compile error"),
        err
      );
    }

    console.log(chalk.green("[compile client] success"));
    compiled.client = true;
    if (inited) {
      browserSync.reload();
      console.log(chalk.green("[browserSync] Reload Browser"));
    } else if (compiled.server && compiled.client) {
      init();
    }
  });
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
