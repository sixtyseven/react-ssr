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

app.use(compression());
isDevelopEnv
  ? app.use(express.static(APP_DIST_FOLDER.distDev))
  : app.use(express.static(APP_DIST_FOLDER.distProd));

app.get("/*", (req, res) => {
  const currentRoute = Routes.find((route) => matchPath(req.url, route)) || {};
  let promise;

  if (currentRoute.loadData) {
    promise = currentRoute.loadData();
  } else {
    promise = Promise.resolve(null);
  }

  promise.then((data) => {
    const context = { data };

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

    const theHtml = `
    <html ${helmet.htmlAttributes.toString()}>
    <head>
    ${headTitle}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    </head>
    <body>
    <div id="reactele">{{{reactele}}}</div>
    <script src="/app.js" charset="utf-8"></script>
    </body>
    </html>
    `;
    const hbsTemplate = hbs.compile(theHtml);

    const htmlToSend = hbsTemplate({ reactele: reactComp }).replace(
      "</head>",
      `<script>window.__ROUTE_DATA__ = ${serialize(data)}</script></head>`
    );
    res.send(htmlToSend);
  });
});

const port = process.env.PORT || 3030;

app.listen(port, function listenHandler() {
  console.info(`Running on PORT ${port}... v14 `);
});
