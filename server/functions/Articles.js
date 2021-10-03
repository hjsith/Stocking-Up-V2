const { Articles } = require("../db/Models");

//this function retrives all the articles from the database to display in the front end
async function getArticles() {
  return await Articles.findAll();
}

module.exports = { getArticles };
