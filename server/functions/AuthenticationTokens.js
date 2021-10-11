import { AuthenticationTokens } from "../db/Models.js";

export async function createAuthenticationTokens( //authentication  token is made
  InputRefreshToken,
  InputInvestorID,
  InputDeviceName,
  InputCreatedTime,
  InputExpiryTime
) {
  await AuthenticationTokens.destroy({
    //only one refresh token is made
    where: { InvestorID: InputInvestorID },
  });
  return AuthenticationTokens.create({
    RefreshToken: InputRefreshToken,
    InvestorID: InputInvestorID,
    DeviceName: InputDeviceName,
    CreatedTime: InputCreatedTime,
    ExpiryTime: InputExpiryTime,
  });
}

export async function getAuthenticationTokens(RefreshToken) {
  return await AuthenticationTokens.findByPk(RefreshToken);
}

export async function deleteAuthenticationTokens(RefreshTokens) {
  row = await getAuthenticationTokens(RefreshTokens);
  return await row.destroy();
}
