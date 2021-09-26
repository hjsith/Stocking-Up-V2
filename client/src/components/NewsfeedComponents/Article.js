import React from "react";
const Article = ({ title, description, url, publishedAt, urlToImage }) => {
  return (
    <div className="newsPanel">
      <div className="datePanel">
        <div className="image">
          <img src={urlToImage} />
        </div>
      </div>

      <div className="newsContent">
        <h3>
          <a href={url}>{title}</a>
        </h3>
        <h4>{publishedAt}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Article;
