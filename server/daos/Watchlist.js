const { DataTypes } = require("sequelize");
const db = require("./DBInstance");

const Watchlist = sequelize.define(
  "Watchlist",
  {
    InvestorID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: Investor,
        key: "InvestorID",
      },
    },
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
  },
  { tableName: "Watchlist", timestamps: false }
);

async function getAllWatchlist() {
  return await Watchlist.findAll();
}

module.exports = {
  Watchlist,
  getAllWatchlist,
};
