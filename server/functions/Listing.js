const { Listing } = require("../db/Models");

//Get all listing function
async function getAllListings() {
  return await Listing.findAll();
}

//Get listing by company code
async function getListing(code) {
  return await Listing.findByPk(code);
}

//Create Listing
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
