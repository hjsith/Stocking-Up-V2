import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/Newsfeed.scss";
import { useState } from "react";
import Article from "../components/NewsfeedComponents/Article";
// this section of the code displays the newsfeed page based on the articles from the List component
const Newsfeed = () => {
  const [search, setSearch] = useState([]);

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

  return (
    <>
      <NavBar />
      <div className="newsTitle">
        <h1>News Feed</h1>
      </div>
      <div className="introPara">
        <p>See below for the latest business and finance related news!</p>
      </div>
      <div className="NewsSearch">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <div className="articleList">
        {articles
          .filter((article) => {
            if (search == "") {
              return article;
            } else if (
              article.ArticleName.toLowerCase().includes(search.toLowerCase())
            ) {
              return article;
            } else if (
              article.ArticleInfo.toLowerCase().includes(search.toLowerCase())
            ) {
              return article;
            }
          })
          .sort((a, b) => (a.ArticleDate < b.ArticleDate ? 1 : -1))
          .map((article) => (
            <Article
              title={article.ArticleName}
              description={article.ArticleInfo}
              url={article.ArticleURL}
              publishedAt={article.ArticleDate}
              urlToImage={article.ArticleImage}
            />
          ))}{" "}
      </div>
    </>
  );
};

export default Newsfeed;
