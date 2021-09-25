const env = require("../Environment");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const {
  createAuthenticationTokens,
  getAuthenticationTokens,
  deleteAuthenticationTokens
} = require("./AuthenticationTokens");
const { getInvestorsWithUsername } = require("./Investor");

async function generateNewAuthenticationTokens(user, deviceName, res) {
  const now = new Date();
  const monthFromNow = new Date();
  monthFromNow.setDate(monthFromNow.getDate() + 30);
  const refreshToken = v4();
  const serverRefreshToken = await createAuthenticationTokens(
    refreshToken,
    user.InvestorID,
    deviceName,
    now,
    monthFromNow
  );
  const clientRefreshToken = jwt.sign(
    {
      username: user.Username,
      token: refreshToken
    },
    env.jwt_secret,
    { expiresIn: "30 days" }
  );
  const clientAccessToken = jwt.sign(
    {
      username: user.Username,
      token: v4()
    },
    env.jwt_secret,
    { expiresIn: "30m" }
  );

  res.cookie("access_tokens", {
    access_token: clientAccessToken,
    refresh_token: clientRefreshToken
  });
}
async function getAuthenticatedUser(req, res) {
  //checks if the user is authenticated
  const clientTokensCookie = req.cookies["access_tokens"] ?? {};

  const clientAccessToken = verifyToken(clientTokensCookie.access_token);
  if (clientAccessToken) {
    return getInvestorsWithUsername(clientAccessToken.username);
  }

  const clientRefreshToken = verifyToken(clientTokensCookie.refresh_token);
  if (clientRefreshToken) {
    const user = await getInvestorsWithUsername(clientRefreshToken.username);
    const serverRefreshToken = await getAuthenticationTokens(
      clientRefreshToken.token
    );
    if (user && serverRefreshToken) {
      // existing refresh token is removed before a new one is created
      await deleteAuthenticationTokens(serverRefreshToken);
      await generateNewAuthenticationTokens(
        user,
        req.headers.host ?? "Unknown",
        res
      );

      return user;
    }
  }
  return null; //user is not authenticated
}

function verifyToken(token) {
  try {
    return jwt.verify(token, env.jwt_secret);
  } catch (err) {}
}
module.exports = { generateNewAuthenticationTokens, getAuthenticatedUser };
