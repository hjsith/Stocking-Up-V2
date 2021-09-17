const { DataTypes, Op } = require("sequelize");
const db = require("./DBInstance");

const Threads = db.define(
  "Threads",
  {
    ThreadID: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    Title: DataTypes.TEXT,
    Description: DataTypes.TEXT,
  },
  { sequelize: db, tableName: "Threads", timestamps: false }
);

//Relationships
Threads.belongsTo(Listing, { foreignKey: "ListingID" });
Threads.hasMany(Comments, { foreignKey: "ThreadID" });

async function getAllThreads() {
  return await Threads.findAll();
}

module.exports = { Threads, getAllThreads };
