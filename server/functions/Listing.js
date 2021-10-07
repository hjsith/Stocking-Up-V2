import { Listing } from "../db/Models.js";

//Get all listing function
export async function getAllListings() {
  return await Listing.findAll();
}

//Get listing by company code
export async function getListing(code) {
  return await Listing.findByPk(code);
}

//Create Listing
export async function createListing(
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
