import React from "react";
import NavBar from "../components/NavBar";
import List from "../components/NewsfeedComponents/List";
import "../assets/css/Newsfeed.scss";
// this section of the code displays the newsfeed page based on the articles from the List component
const Newsfeed = () => {
  return (
    <>
      <NavBar />
      <div className="newsTitle">
        <h1>News Feed</h1>
      </div>
      <div className="introPara">
        <p>See below for the latest business and finance related news!</p>
      </div>

      <div className="articleList">
        <List />
      </div>
    </>
  );
};

export default Newsfeed;