const express = require("express");
const path = require("path");
const BaseRouter = require("./routes/Router");
const { StatusCodes } = require("http-status-codes");
const cookieParser = require("cookie-parser");

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

module.exports = app;
