const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

// Init shared
const router = Router();

router.get("/investors", async (req, res) => {
  return res.status(StatusCodes.OK);
});

module.exports = router;
