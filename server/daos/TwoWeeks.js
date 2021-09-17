const { DataTypes } = require("sequelize");
const db = require("./DBInstance");
const { Listing } = require("./Listing");

const TwoWeeks = db.define(
  "TwoWeeks",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    PastPrice: DataTypes.DECIMAL(10, 2),
    DateTimeOfPrice: DataTypes.DATE,
  },
  { sequelize: db, tableName: "TwoWeeks", timestamps: false }
);

TwoWeeks.belongsTo(Listing, { foreignKey: "ListingID" });

async function getAllTwoWeeksPrices() {
  return await TwoWeeks.findAll();
}

async function getTwoWeeksPricesForListing(code) {
  return await TwoWeeks.findAll({
    where: {
      ListingID: code,
    },
  });
}

module.exports = { Price, getAllTwoWeeksPrices, getTwoWeeksPricesForListing };
