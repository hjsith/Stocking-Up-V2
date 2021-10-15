import React from "react";

const Article = ({ title, description, url, publishedAt, urlToImage }) => {
  var date = publishedAt.substring(0, 10); // the date variable is substringed to only extract the part of the date that contains the YYYY/MM/DD format as the variable from the API also included the time
  // the format for each article is made in the below section
  return (
    <div className="newsPanel">
      <div className="datePanel">
        {
          <div className="image">
            <img src={urlToImage} />
          </div>
        }
      </div>

      <div className="newsContent">
        <h3>
          <a>{title}</a>
        </h3>
        <h4>{date}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Article;
