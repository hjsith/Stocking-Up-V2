const { Investor } = require("../db/Models");

async function getAllInvestors() {
  return await Investor.findAll();
}

async function getInvestor(userID) {
  return await Investor.findByPk(userID);
}

async function createInvestor(fName, lName, email, password, username) {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return Investor.create({
    InvestorFName: fName,
    InvestorLName: lName,
    InvestorEmail: email,
    InvestorPassword: password,
    Username: username,
    NetWorth: 0,
    InvestorRanking: 0,
    InvestorDifficulty: "NEEDED",
    DateJoined: date,
    Title: "NEEDED",
    Funds:0
  });
}

async function getInvestorPassword(username) {
  return Investor.findOne({
    attributes: ["InvestorPassword"],
    where: {
      Username: username
    }
  });
}

async function checkUsernameExist(username) {
  var searchedInvestor = await Investor.findOne({
    where: {
      Username: username
    }
  });
  if (searchedInvestor === null) {
    return false;
  } else {
    return true;
  }
}

async function getInvestorsWithUsername(username) {
  return Investor.findAll({
    where: {
      Username: {
        [Op.substring]: username
      }
    }
  });
}

async function updateInvestorPassword(userID, username, password) {
  var updatedInvestorCount = await Investor.update(
    { InvestorPassword: password },
    {
      where: {
        [Op.or]: [{ Username: username }, { InvestorID: userID }]
      }
    }
  );
  if (updatedInvestorCount[0] >= 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getAllInvestors,
  getInvestor,
  createInvestor,
  getInvestorPassword,
  checkUsernameExist,
  getInvestorsWithUsername,
  updateInvestorPassword
};
