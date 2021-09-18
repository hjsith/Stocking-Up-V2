const env = require("../Environment");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const {
  createAuthenticationTokens,
  getAuthenticationTokens,
  deleteAuthenticationTokens
} = require("./AuthenticationTokens");

async function generateNewAuthenticationTokens(user, deviceName, res) {
  const now = new Date();
  const monthFromNow = new Date();
  monthFromNow.setDate(monthFromNow.getDate() + 30);
  const refreshToken = v4();
  const serverRefreshToken = await createAuthenticationTokens(
    refreshToken,
    user,
    deviceName,
    now,
    monthFromNow
  );
  const clientRefreshToken = jwt.sign(
    {
      username: user,
      token: refreshToken
    },
    env.jwt_secret,
    { expiresIn: "30 days" }
  );
  const clientAccessToken = jwt.sign(
    {
      username: user,
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

module.exports = generateNewAuthenticationTokens;
