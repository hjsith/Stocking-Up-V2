const { DataTypes } = require("sequelize");
const db = require("./DBInstance");

const Watchlist = db.define(
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

//Relationships
Watchlist.belongsTo(Listing, { foreignKey: "ListingID" });
Watchlist.belongsTo(Investor, { foreignKey: "InvestorID" });

async function getAllWatchlist() {
  return await Watchlist.findAll();
}

module.exports = {
  Watchlist,
  getAllWatchlist,
};
