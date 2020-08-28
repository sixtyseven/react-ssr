import path from "path";
import fs from "fs";
import express from "express";
import compression from "compression";
import hbs from "handlebars";
import serialize from "serialize-javascript";
import React from "react";
import { Helmet } from "react-helmet";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import App from "../App";
import Routes from "../routes";
import { APP_DIST_FOLDER } from "../../config/appPath";

const isDevelopEnv = process.env.NODE_ENV === "development";

const app = express();
const dist = isDevelopEnv ? APP_DIST_FOLDER.distDev : APP_DIST_FOLDER.distProd;

app.use(compression());

app.use("/static", express.static(path.resolve(dist, "static")));

app.get("/*", (req, res) => {
  const currentRoute = Routes.find((route) => matchPath(req.url, route)) || {};
  let promise;

  if (currentRoute.loadData) {
    promise = currentRoute.loadData();
  } else {
    promise = Promise.resolve(null);
  }

  const indexFile = path.resolve(`./${dist}/static/index.html`);

  fs.readFile(indexFile, "utf8", (err, fileData) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res
        .status(500)
        .send("Oops, error happened when reading index.html file!");
    }

    promise.then((pageData) => {
      const context = { data: pageData };

      const reactComp = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      const helmet = Helmet.renderStatic();
      let headTitle = helmet.title.toString();

      // title is not set
      if (headTitle.includes("></title>")) {
        headTitle = "<title>Default Title</title>";
      }

      const head = headTitle + helmet.meta.toString() + helmet.link.toString();
      const routeDataJs = `<script>window.__ROUTE_DATA__ = ${serialize(
        pageData
      )}</script>`;

      const hbsTemplate = hbs.compile(fileData);

      const htmlToSend = hbsTemplate({
        htmlAttributes: helmet.htmlAttributes.toString(),
        head,
        routeDataJs,
        reactele: reactComp,
      }).replace('src="app.', 'src="static/app.');

      res.send(htmlToSend);
    });
  });
});

const port = process.env.PORT || (isDevelopEnv ? 3030 : 80);

app.listen(port, function listenHandler() {
  console.info(`Running on PORT ${port}... v16 `);
});
