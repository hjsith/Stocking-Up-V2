export function getCurrentPriceForListing(code) {
  return fetch("/api/price" + "?code=" + code, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getCompanyName(code) {
  return fetch("/api/listing" + "?code=" + code, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
