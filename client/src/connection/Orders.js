const moment = require("moment");

export async function buyOrder(investorID, quantityOrder, listingID) {
  let now = moment();
  let future = moment().add(15, "minutes");
  let currentUTCTime = moment.utc(now, "YYYY-MM-DD HH:mm:ss");
  let futureUTCTime = moment.utc(future, "YYYY-MM-DD HH:mm:ss");

  let results = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      investorID: investorID,
      quantityOrder: quantityOrder,
      listingID: listingID,
      typeOfOrder: "BUY",
      orderTime: currentUTCTime,
      executionTime: futureUTCTime,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return results;
}
