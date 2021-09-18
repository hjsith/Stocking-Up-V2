const { Articles } = require("../db/Models");

async function getArticles() {
  return await Articles.findAll();
}

module.exports = { getArticles };
