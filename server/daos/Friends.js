const { DataTypes, Op } = require("sequelize");
const db = require("./DBInstance");

const Friends = db.define(
  "Friends",
  {
    FriendID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    RequestingUsername: DataTypes.STRING,
    AcceptingUsername: DataTypes.STRING,
    Status: DataTypes.BOOLEAN
  },
  { sequelize: db, tableName: "Friends", timestamps: false }
);

async function getAllCurrentFriends() {
    return await Friends.findAll();
  }

//Relationships
Friends.belongsTo(Investor, { foreignKey: "RequestingUsername" });
Friends.belongsTo(Investor, { foreignKey: "AcceptingUsername" });

module.exports = { Friends, getAllCurrentFriends };