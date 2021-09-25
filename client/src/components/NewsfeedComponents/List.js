import React, { useState, useEffect } from "react";
import Axios from "axios";
import Article from "./Article";
const moment = require("moment");

const List = () => {
  fetch("/api/orders"),
    {
      method: "POST",
    };

  /*  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const res = await Axios.get(
        "https://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=a2461adc51034c3c8d7fcc374949d3c2"
      );

      setArticles(res.data.articles);
      console.log(res);
    };

    getArticles();
  }); */

  return (
    <div>
      {articles.map(({ title, description, url, publishedAt }) => (
        <Article
          title={title}
          description={description}
          url={url}
          publishedAt={publishedAt}
        />
      ))}
    </div>
  );
};

export default List;
