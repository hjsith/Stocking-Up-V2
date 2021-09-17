const { DataTypes } = require("sequelize");
const db = require("./DBInstance");
const { Listing } = require("./Listing");

const FiveDays = db.define(
  "FiveDays",
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
  { sequelize: db, tableName: "FiveDays", timestamps: false }
);

FiveDays.belongsTo(Listing, { foreignKey: "ListingID" });

async function getAllFiveDaysPrices() {
  return await FiveDays.findAll();
}

async function getFiveDaysPricesForListing(code) {
  return await FiveDays.findAll({
    where: {
      ListingID: code,
    },
  });
}

module.exports = { Price, getAllFiveDaysPrices, getFiveDaysPricesForListing };
