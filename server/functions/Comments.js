const { Comments } = require("../db/Models");

async function getAllComments() {
  return await Comments.findAll();
}

module.exports = { getAllComments };
