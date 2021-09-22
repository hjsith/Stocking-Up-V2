import React from "react";
const Article = ({ title, description, url, publishedAt }) => {
  return (
    <div className="newsPanel">
      <div className="datePanel">
        <h4>{publishedAt}</h4>
      </div>

      <div className="newsContent">
        <h3>
          <a href={url}>{title}</a>
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Article;
