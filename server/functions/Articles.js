const { Articles } = require("../db/Models");
const moment = require("moment");

async function getArticles() {
  return await get(
    "https://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=a2461adc51034c3c8d7fcc374949d3c2"
  );
}

async function updateArticles() {
  let now = moment.utc();
  console.log(
    "Looking for new articles to add to the page!" +
      moment.utc(now, "YYYY-MM-DD HH:mm:ss").format()
  );
}
module.exports = { getArticles, updateArticles };
