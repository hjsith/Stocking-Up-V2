const { Friends } = require("../db/Models");

async function getAllCurrentFriends() {
  return await Friends.findAll();
}

module.exports = { getAllCurrentFriends };
