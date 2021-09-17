const { DataTypes } = require("sequelize");
const db = require("./DBInstance");

const Holding = sequelize.define(
  "Holding",
  {
    HoldingID: {
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
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    OrderID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: Order,
        key: "OrderID",
      },
    },
    Current: DataTypes.BOOLEAN,
  },
  { sequelize: db, tableName: "Holding", timestamps: false }
);

async function getAllHoldings() {
  return await Holding.findAll();
}

module.exports = {
  Holding,
  getAllHoldings,
};
