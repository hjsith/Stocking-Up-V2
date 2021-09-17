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

//Relationships
Listing.hasMany(Order, { foreignKey: "ListingID" });
Listing.hasMany(Holding, { foreignKey: "ListingID" });
Listing.hasOne(Threads, { foreignKey: "ListingID" });
Listing.hasMany(Watchlist, { foreignKey: "ListingID" });
Listing.hasMany(OneDay, { foreignKey: "ListingID" });
Listing.hasMany(FiveDays, { foreignKey: "ListingID" });
Listing.hasMany(TwoWeeks, { foreignKey: "ListingID" });
Listing.hasMany(OneMonth, { foreignKey: "ListingID" });
Listing.hasOne(Price, { foreignKey: "ListingID" });

async function getAllListings() {
  return await Listing.findAll();
}

module.exports = { Listing, getAllListings };
