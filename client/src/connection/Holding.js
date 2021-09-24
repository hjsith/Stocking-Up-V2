export function getAllExecutedOrdersByInvestor(investorID) {
  return fetch("/api/holdings" + "?investorID=" + investorID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
