import { Articles } from "../db/Models.js";
import moment from "moment";
import Axios from "axios";

export async function getAllArticles() {
  return await Articles.findAll();
}

export async function updateArticles() {
  let now = moment.utc();
  console.log(
    "Looking for new articles to add to the page!" +
      moment.utc(now, "YYYY-MM-DD HH:mm:ss").format()
  );
  const res = await Axios.get(
    "https://newsapi.org/v2/everything?q=%22ASX%22&sources=abc-news-au,%20ABC%20News%20(AU)&apiKey=a2461adc51034c3c8d7fcc374949d3c2"
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
        ArticleSource: res.data.articles[i].source.name,
      });
    }
  }
}
