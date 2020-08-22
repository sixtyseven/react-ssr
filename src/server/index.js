import express from "express";
import compression from "compression";
import hbs from "handlebars";
import App from "../App";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";

const app = express();

app.use(compression());
app.use(express.static("dist"));

// app.use("/firstssr", ssr);

app.get("/*", (req, res) => {
  const context = {};
  const theHtml = `
  <html>
  <head><title>My First SSR</title></head>
  <body>
  <h1>My SSR Template</h1>
  <div id="reactele">{{{reactele}}}</div>
  <script src="/app.js" charset="utf-8"></script>
  <script src="${process.env.BROWSER_REFRESH_URL}"></script>
  </body>
  </html>
  `;
  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  res.send(htmlToSend);
});

const port = process.env.PORT || 3030;

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}... v2 `);
});
