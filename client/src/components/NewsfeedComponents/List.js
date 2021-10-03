import React, { useState, useEffect } from "react";
import Article from "./Article";
const moment = require("moment");

const List = () => {
  const [articles, setArticles] = useState([]); // this creates an array for the articles
  // this section fetches for all the articles from the database
  fetch("/api/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    res.json().then((body) => {
      setArticles(body);
    });
  });
  // this section maps all the articles from the database
  return (
    <div>
      {articles.map((article) => (
        <Article
          title={article.ArticleName}
          description={article.ArticleInfo}
          url={article.ArticleURL}
          publishedAt={article.ArticleDate}
          urlToImage={article.ArticleImage}
        />
      ))}
    </div>
  );
};

export default List;
