import db from "./db/DBInstance.js";
import env from "./Environment.js";
import app from "./server.js";
import cron from "node-cron";
import { pendingOrderCheck } from "./functions/Order.js";
import { updateArticles } from "./functions/Articles.js";

const PORT = env.port;

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

cron.schedule("15 * * * *", async function () {
  await updateArticles();
});
