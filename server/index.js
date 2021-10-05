// const express = require("express");
// const path = require("path");
const db = require("./db/DBInstance");
const env = require("./Environment");
const app = require("./server.js");
// const BaseRouter = require("./routes/Router");
// const { StatusCodes } = require("http-status-codes");
const cron = require("node-cron");
const { pendingOrderCheck } = require("./functions/Order");
// const cookieParser = require("cookie-parser");

// const app = express();
const PORT = env.port;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //Used to process cookies in requests for User Authentication
// app.use(cookieParser());

// app.use("/api", BaseRouter);

// const staticDir = path.join(__dirname, "../client/build/");
// app.use(express.static(staticDir));

// app.get("*", (req, res) => {
//   if (req.url.startsWith("/api")) {
//     res.status(StatusCodes.NOT_FOUND).end();
//   } else {
//     res.sendFile("index.html", { root: staticDir });
//   }
// });

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
if (env.node_env != "test") {
  cron.schedule("* * * * *", async function () {
    await pendingOrderCheck();
  });
}

module.exports = { app };
