const { DataTypes } = require("sequelize");
const db = require("./DBInstance");

const Article = db.define(
  "Article",
  {
    ArticleID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    ArticleName: DataTypes.TEXT,
    ArticleDate: DataTypes.DATE,
    ArticleInfo: DataTypes.TEXT,
  },
  { sequelize: db, tableName: "Article", timestamps: false }
);
async function getArticles() {
  return await Article.findAll();
}

module.exports = { Article, getArticles };
