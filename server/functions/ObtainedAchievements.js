const { ObtainedAchievements } = require("../db/Models");

async function getAllObtainedAchievements() {
  return await ObtainedAchievements.findAll();
}

module.exports = { getAllObtainedAchievements };
