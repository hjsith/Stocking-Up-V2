const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getInvestor,
  updateInvestorPassword,
} = require("../functions/Investor");

// Init shared
const router = Router();

router.get("/allInvestors", async (req, res) => {
  const listings = await getAllListings();

  return res.status(StatusCodes.OK).json(listings);
});

router.put("/updatePassword", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  //NewPassword needs to be hashed using bcrypt package

  const updateCheck = await updateInvestorPassword(
    data.userID ?? "",
    data.username ?? "",
    data.newPassword
  );

  if (updateCheck) {
    return res.status(StatusCodes.OK).send();
  }
  return res.status(StatusCodes.CONFLICT).send();
});

router.get("/investor", async (req, res) => {
  const user = await getInvestor(req.query.id);
  if (user === null) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: "User could not be found." });
  }
  return res.status(StatusCodes.OK).json(user);
});

module.exports = router;
