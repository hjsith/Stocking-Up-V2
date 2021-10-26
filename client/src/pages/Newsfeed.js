import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import "../assets/css/Newsfeed.scss";
import { useState } from "react";
import Article from "../components/NewsfeedComponents/Article";
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";

// this section of the code displays the newsfeed page based on the articles from the List component
const Newsfeed = () => {
  const cont = useContext(UserContext);
  const [search, setSearch] = useState([]); //this section creates the variable used to generate the search results based on user input
  const [articles, setArticles] = useState([]); // this creates an array for the articles
  const [unauth, setunauth] = useState(false);
  // this section fetches for all the articles from the database
  fetch("/api/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((body) => {
        setArticles(body);
      });
    } else if (res.status === 401) {
      setunauth(true);
    }
  });

  if (unauth || cont.user.name === "") {
    return (
      <Redirect
        to={{
          pathname: "/SignIn",
        }}
      />
    );
  }

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
            // this section filters for articles based on the the search, otherwise shows all articles
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
          .sort((a, b) => (a.ArticleDate < b.ArticleDate ? 1 : -1)) // this section sorts the articles by date
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
