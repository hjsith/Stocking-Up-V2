const { DataTypes, Op } = require("sequelize");
const db = require("./DBInstance");
const AuthenticationTokens = sequelize.define(
    "AuthenticationTokens",
    {
      RefreshToken: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      InvestorID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
          model: Investor,
          key: "InvestorID",
        },
      },
      DeviceName: DataTypes.TEXT,
      CreatedTime: DataTypes.DATE,
      ExpiryTime: DataTypes.DATE,
    },
    { tableName: "AuthenticationTokens", timestamps: false }
  );

  AuthenticationTokens.belongsTo(Investor, { foreignKey: "InvestorID" });

  async function getAllAuthenticationTokens() {
    return await AuthenticationTokens.findAll();
  }
  
  module.exports = { Listing, getAllAuthenticationTokens };
  
