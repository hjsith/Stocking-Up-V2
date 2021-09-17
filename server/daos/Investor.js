const { DataTypes } = require("sequelize");
const db = require("./DBInstance");

const Investor = db.define(
  "Investor",
  {
    InvestorID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    InvestorFName: DataTypes.TEXT,
    InvestorLName: DataTypes.TEXT,
    //Made the email a string in case TEXT doesn't support VARCHAR
    InvestorEmail: DataTypes.STRING,
    InvestorPassword: DataTypes.TEXT,
    Username: DataTypes.TEXT,
    NetWorth: DataTypes.BIGINT,
    InvestorRanking: DataTypes.INTEGER,
    InvestorDifficulty: DataTypes.TEXT,
    //Used DATEONLY to get only the date and not time too not sure if we want time
    DateJoined: DataTypes.DATEONLY,
    Title: DataTypes.TEXT,
  },
  { sequelize: db, tableName: "Investor", timestamps: false }
);

module.exports = { Investor };
