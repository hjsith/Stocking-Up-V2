const { DataTypes } = require("sequelize");
const db = require("./DBInstance");

const Order = db.define(
  "Order",
  {
    OrderID: {
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
    QuantityOrder: DataTypes.INTEGER,
    ListingPrice: DataTypes.DECIMAL(10, 2),
    OrderTotal: DataTypes.DECIMAL(10, 2),
    ExecutionTime: DataTypes.DATE,
    OrderTime: DataTypes.DATE,
    Status: DataTypes.STRING,
    TypeOfOrder: DataTypes.STRING,
  },
  { sequelize: db, tableName: "Order", timestamps: false }
);
async function getAllOrders() {
  return await Order.findAll();
}

module.exports = { Order, getAllOrders };
