const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllInvestors,
  getInvestor,
  updateInvestorPassword,
} = require("../functions/Investor");
const bcrypt = require("bcrypt");
const { getAuthenticatedUser } = require("../functions/Authenticate");

// Init shared
const router = Router();

router.get("/allInvestors", async (req, res) => {
  const investors = await getAllInvestors();
  return res.status(StatusCodes.OK).json(investors);
});

router.put("/updatePassword", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const passHash = await bcrypt.hash(data.password, 10);

  const updateCheck = await updateInvestorPassword(
    data.userID ?? "",
    data.username ?? "",
    passHash
  );

  if (updateCheck) {
    return res.status(StatusCodes.OK).send();
  }
  return res.status(StatusCodes.CONFLICT).send();
});

router.get("/investor", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const user = await getInvestor(req.query.id);
    if (user === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: "User could not be found." });
    }
    return res.status(StatusCodes.OK).json(user);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

module.exports = router;
