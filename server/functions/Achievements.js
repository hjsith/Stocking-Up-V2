const { Achievements } = require("../db/Models");

async function getAllCurrentAchievements() {
  return await Achievements.findAll();
}

module.exports = { getAllCurrentAchievements };
