const { AuthenticationTokens } = require("../db/Models");

async function createAuthenticationTokens(
  InputRefreshToken,
  InputInvestorID,
  InputDeviceName,
  InputCreatedTime,
  InputExpiryTime
) {
  return AuthenticationTokens.create({
    RefreshToken: InputRefreshToken,
    InvestorID: InputInvestorID,
    DeviceName: InputDeviceName,
    CreatedTime: InputCreatedTime,
    ExpiryTime: InputExpiryTime
  });
}

async function getAuthenticationTokens(RefreshToken) {
  return await AuthenticationTokens.findByPk(RefreshToken);
}

async function deleteAuthenticationTokens(RefreshTokens) {
  row = await getAuthenticationTokens(RefreshTokens);
  return await row.destroy();
}

module.exports = {
  createAuthenticationTokens,
  getAuthenticationTokens,
  deleteAuthenticationTokens
};
