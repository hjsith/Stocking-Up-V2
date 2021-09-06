const { DataTypes } = require("sequelize");
const db = require("./DBInstance");
const { Listing } = require("./Listing");

const Price = db.define(
  "Price",
  {
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    CurrentPrice: DataTypes.DECIMAL(10, 2),
  },
  { sequelize: db, tableName: "Price", timestamps: false }
);

Price.belongsTo(Listing, { foreignKey: "ListingID" });

async function getAllCurrentPrices() {
  return await Price.findAll();
}

module.exports = { Price, getAllCurrentPrices };
