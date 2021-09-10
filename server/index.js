const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("express");
const helmet = require("helmet");
const db = require("./daos/DBInstance");
const env = require("./Environment");
const BaseRouter = require("./routes/Router");

const app = express();
const PORT = env.port;
const staticDir = path.join(__dirname, "../client/build/");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticDir));
app.use(helmet());
app.use(cookieParser());

app.use("/api", BaseRouter);

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: staticDir });
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
