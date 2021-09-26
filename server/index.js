const express = require("express");
const path = require("path");
const db = require("./db/DBInstance");
const env = require("./Environment");
const BaseRouter = require("./routes/Router");
const { StatusCodes } = require("http-status-codes");
const cron = require("node-cron");
const { updateArticles } = require("./functions/Articles");

const app = express();
const PORT = env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

async function dbconnect() {
  try {
    await db.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

dbconnect();

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

cron.schedule("30 * * * *", async function () {
  await updateArticles();
});

module.exports = { app };
