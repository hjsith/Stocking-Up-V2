import { Listing, Price } from "../db/Models.js";

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
    YearLowPrice: inputYearLowPrice
  });
}

export async function getTop200() {
  const listings = await Listing.findAll({
    order: [["MarketCap", "DESC"]],
    limit: 200
  }); // gets top 200 listings in descending order
  let prices = [];

  for (let i = 0; i < listings.length; ++i) {
    const price = await Price.findOne({
      where: {
        ListingID: listings[i].ListingID
      }
    });
    prices.push(price);
  }

  var newData = [];

  for (let i = 0; i < listings.length; ++i) {
    newData.push({
      ListingID: listings[i].ListingID,
      ListingName: listings[i].ListingName,
      CurrentPrice: prices[i].CurrentPrice,
      ListingIndustry: listings[i].ListingIndustry,
      MarketCap: listings[i].MarketCap
    });
  }
  return newData;
}

export async function getop5Gains() {
  //top 5 gains for the day
  const listings = await Listing.findAll();
  const prices = await Price.findAll();
  let priceChange = [];
  for (let i = 0; i < listings.length; ++i) {
    if (
      prices[i].CurrentPrice == 0.0 ||
      listings[i].ClosingPrice == 0.0 ||
      listings[i].VolumeShares == 0
    ) {
      priceChange.push({
        ListingID: listings[i].ListingID, //calculating change
        ListingName: listings[i].ListingName,
        CurrentPrice: prices[i].CurrentPrice,
        ListingIndustry: listings[i].ListingIndustry,
        change: 0
      });
    } else {
      priceChange.push({
        ListingID: listings[i].ListingID, //calculating change
        ListingName: listings[i].ListingName,
        CurrentPrice: prices[i].CurrentPrice,
        ListingIndustry: listings[i].ListingIndustry,
        change: (
          (prices[i].CurrentPrice - listings[i].ClosingPrice) /
          listings[i].ClosingPrice
        ).toFixed(2)
      });
    }
  }
  priceChange.sort(function(a, b) {
    //sort change of price
    return a.change - b.change;
  });
  return priceChange.slice(-5);
}
export async function getop5Declines() {
  //top 5 declines for the day
  const listings = await Listing.findAll();
  const prices = await Price.findAll();
  let priceChange = [];
  for (let i = 0; i < listings.length; ++i) {
    if (
      prices[i].CurrentPrice == 0.0 ||
      listings[i].ClosingPrice == 0.0 ||
      listings[i].VolumeShares == 0
    ) {
      priceChange.push({
        ListingID: listings[i].ListingID, //calculating change
        ListingName: listings[i].ListingName,
        CurrentPrice: prices[i].CurrentPrice,
        ListingIndustry: listings[i].ListingIndustry,
        change: 0
      });
    } else {
      priceChange.push({
        ListingID: listings[i].ListingID, //calculating change
        ListingName: listings[i].ListingName,
        CurrentPrice: prices[i].CurrentPrice,
        ListingIndustry: listings[i].ListingIndustry,
        change: (
          (prices[i].CurrentPrice - listings[i].ClosingPrice) /
          listings[i].ClosingPrice
        ).toFixed(2)
      });
    }
  }
  priceChange.sort(function(a, b) {
    //sort change of price
    return a.change - b.change;
  });
  return priceChange.slice(0, 5);
}
