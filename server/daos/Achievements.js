const { DataTypes, Op } = require("sequelize");
const db = require("./DBInstance");

const Achievements = db.define(
  "Achievements",
  {
    AchievementID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: DataTypes.STRING,
    Description: DataTypes.STRING,
	MedalImage: DataTypes.BLOB
  },
  { sequelize: db, tableName: "Achievements", timestamps: false }
);

async function getAllCurrentAchievements() {
    return await Achievements.findAll();
  }
 
//Relationships
Achievements.hasMany(ObtainedAchievements, { foreignKey: "AchievementID" });

module.exports = { Achievements, getAllCurrentAchievements };