const { Articles } = require("../db/Models");
const moment = require("moment");

async function getArticles() {
  return await Articles.findAll();
}

async function updateArticles() {
  let now = moment.utc();
  console.log(
    "Looking for new articles to add to the page!" +
      moment.utc(now, "YYYY-MM-DD HH:mm:ss").format()
  );
}
module.exports = { getArticles, updateArticles };
