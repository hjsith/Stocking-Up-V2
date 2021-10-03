const { Listing } = require("../db/Models");

async function getAllListings() {
  return await Listing.findAll();
}

async function getListing(code) {
  return await Listing.findByPk(code);
}

async function createListing(
  inputListingID,
  inputListingName,
  inputListingIndustry,
  inputVolumeShares,
  inputMarketCap,
  inputClosingPrice,
  inputYearHighPrice,
  inputYearLowPrice
) {
  return Listing.create({
    ListingID: inputListingID,
    ListingName: inputListingName,
    ListingIndustry: inputListingIndustry,
    VolumeShares: inputVolumeShares,
    MarketCap: inputMarketCap,
    ClosingPrice: inputClosingPrice,
    YearHighPrice: inputYearHighPrice,
    YearLowPrice: inputYearLowPrice,
  });
}

module.exports = { getAllListings, getListing, createListing };
