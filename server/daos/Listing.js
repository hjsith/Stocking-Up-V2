const { DataTypes } = require("sequelize");
const db = require("./DBInstance");

const Listing = db.define(
  "Listing",
  {
    ListingID: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    ListingName: DataTypes.TEXT,
    ListingIndustry: DataTypes.TEXT,
    VolumeShares: DataTypes.BIGINT,
    MarketCap: DataTypes.BIGINT,
    ClosingPrice: DataTypes.DECIMAL(10, 2),
    YearHighPrice: DataTypes.DECIMAL(10, 2),
    YearLowPrice: DataTypes.DECIMAL(10, 2),
  },
  { sequelize: db, tableName: "Listing", timestamps: false }
);

async function getAllListings() {
  return await Listing.findAll();
}

module.exports = { Listing, getAllListings };
