import React, { useState, useEffect } from "react";
import Axios from "axios";
import Article from "./Article";
const moment = require("moment");

const List = () => {
  const [articles, setArticles] = useState([]);

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
