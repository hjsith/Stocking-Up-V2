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

export function getCompanyIndustry(code) {
  return fetch("/api/listing/industry" + "?code=" + code, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getCompanyHighPrice(code) {
  return fetch("/api/listing/priceHigh" + "?code=" + code, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getCompanyLowPrice(code) {
  return fetch("/api/listing/priceLow" + "?code=" + code, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
