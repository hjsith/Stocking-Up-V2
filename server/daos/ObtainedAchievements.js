const { DataTypes, Op } = require("sequelize");
const db = require("./DBInstance");

const ObtainedAchievements = db.define(
  "ObtainedAchievements",
  {
    AchievementID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    InvestorID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    DateAchieved: DataTypes.DATE,
  },
  { sequelize: db, tableName: "ObtainedAchievements", timestamps: false }
);

async function getAllObtainedAchievements() {
    return await ObtainedAchievements.findAll();
  }

//Relationships
ObtainedAchievements.belongsTo(Investor, { foreignKey: "InvestorID" });
ObtainedAchievements.belongsTo(Achievements, { foreignKey: "AchievementID" });

module.exports = { ObtainedAchievements, getAllObtainedAchievements };