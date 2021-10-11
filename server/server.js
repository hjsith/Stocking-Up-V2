import express from "express";
import path from "path";
const __dirname = path.resolve();
import BaseRouter from "./routes/Router.js";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Used to process cookies in requests for User Authentication
app.use(cookieParser());

app.use("/api", BaseRouter);

const staticDir = path.join(__dirname, "../client/build/");
app.use(express.static(staticDir));

app.get("*", (req, res) => {
  if (req.url.startsWith("/api")) {
    res.status(StatusCodes.NOT_FOUND).end();
  } else {
    res.sendFile("index.html", { root: staticDir });
  }
});

export default app;
