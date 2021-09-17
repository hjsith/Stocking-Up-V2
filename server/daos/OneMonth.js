const { DataTypes } = require("sequelize");
const db = require("./DBInstance");
const { Listing } = require("./Listing");

const OneMonth = db.define(
  "OneMonth",
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
  { sequelize: db, tableName: "OneMonth", timestamps: false }
);

OneMonth.belongsTo(Listing, { foreignKey: "ListingID" });

async function getAllOneMonthPrices() {
  return await OneMonth.findAll();
}

async function getOneMonthPricesForListing(code) {
  return await OneMonth.findAll({
    where: {
      ListingID: code,
    },
  });
}

module.exports = { Price, getAllOneMonthPrices, getOneMonthPricesForListing };
