import express from "express";
import compression from "compression";
import ssr from "./routers/ssr";

const app = express();

app.use(compression());
app.use(express.static("dist"));

app.use("/firstssr", ssr);

const port = process.env.PORT || 3030;

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
