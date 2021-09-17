const { AuthenticationTokens } = require("../db/Models");

async function getAllAuthenticationTokens() {
  return await AuthenticationTokens.findAll();
}

module.exports = { getAllAuthenticationTokens };
