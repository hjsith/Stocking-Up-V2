const { Articles } = require("../db/Models");
const moment = require("moment");
const Axios = require("axios");

// this function retrieves all articles
async function getAllArticles() {
  return await Articles.findAll();
}
// this function updates articles to add to the database
async function updateArticles() {
  let now = moment.utc();
  console.log(
    "Looking for new articles to add to the page!" +
      moment.utc(now, "YYYY-MM-DD HH:mm:ss").format()
  );

  // Axios is used to retrieve articles using NewsApi which will retrieve articles from ABC-News with the keyword 'ASX' in the article
  const res = await Axios.get(
    "https://newsapi.org/v2/everything?q=%22ASX%22&sources=abc-news-au,%20ABC%20News%20(AU)&apiKey=a2461adc51034c3c8d7fcc374949d3c2"
  );
  //this check is put in place to prevent duplicate articles
  for (let i = 0; i < res.data.articles.length; ++i) {
    const articleFound = await Articles.findOne({
      where: {
        ArticleName: res.data.articles[i].title,
      },
    });

    // for all the articles that are not duplicates, an article is created into the database
    if (articleFound == null) {
      await Articles.create({
        ArticleName: res.data.articles[i].title,
        ArticleDate: res.data.articles[i].publishedAt,
        ArticleInfo: res.data.articles[i].description,
        ArticleImage: res.data.articles[i].urlToImage,
        ArticleURL: res.data.articles[i].url,
        ArticleSource: res.data.articles[i].source.name,
      });
    }
  }
}
module.exports = { updateArticles, getAllArticles };
