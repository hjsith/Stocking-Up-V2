const { Articles } = require("../db/Models");
const moment = require("moment");
const Axios = require("axios");

async function getAllArticles() {
  return await Articles.findAll();
}

async function updateArticles() {
  let now = moment.utc();
  console.log(
    "Looking for new articles to add to the page!" +
      moment.utc(now, "YYYY-MM-DD HH:mm:ss").format()
  );
  const res = await Axios.get(
    "https://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=a2461adc51034c3c8d7fcc374949d3c2"
  );
  for (let i = 0; i < res.data.articles.length; ++i) {
    const articleFound = await Articles.findOne({
      where: {
        ArticleName: res.data.articles[i].title,
      },
    });
    if (articleFound == null) {
      await Articles.create({
        ArticleName: res.data.articles[i].title,
        ArticleDate: res.data.articles[i].publishedAt,
        ArticleInfo: res.data.articles[i].description,
        ArticleImage: res.data.articles[i].urlToImage,
        ArticleURL: res.data.articles[i].url,
      });
    }
  }
}
module.exports = { updateArticles, getAllArticles };
