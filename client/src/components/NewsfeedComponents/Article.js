import React from "react";

const Article = ({ title, description, url, publishedAt, urlToImage }) => {
  var date = publishedAt.substring(0, 10);
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
        <h4>{date}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Article;
