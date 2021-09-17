const { DataTypes } = require("sequelize");
const db = require("./DBInstance");
const { Listing } = require("./Listing");

const OneDay = db.define(
  "OneDay",
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
  { sequelize: db, tableName: "OneDay", timestamps: false }
);

OneDay.belongsTo(Listing, { foreignKey: "ListingID" });

async function getAllOneDayPrices() {
  return await OneDay.findAll();
}

async function getOneDayPricesForListing(code) {
  return await OneDay.findAll({
    where: {
      ListingID: code,
    },
  });
}

module.exports = { Price, getAllOneDayPrices, getOneDayPricesForListing };
