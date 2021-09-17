const { DataTypes, Op } = require("sequelize");
const db = require("./DBInstance");

const Comments = db.define(
  "Comments",
  {
    CommentID: {
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
    ThreadID: {
      type: DataTypes.STRING(10),
      references: {
        model: Threads,
        key: "ThreadID",
      },
    },
    DateAdded: DataTypes.DATE,
    Comment: DataTypes.TEXT,
    ListingPrice: DataTypes.DECIMAL(10, 2),
    Likes: DataTypes.INTEGER,
  },
  { sequelize: db, tableName: "Comments", timestamps: false }
);

//Relationships
Comments.belongsTo(Threads, { foreignKey: "ThreadID" });
Comments.belongsTo(Investor, { foreignKey: "InvestorID" });

async function getAllComments() {
  return await Comments.findAll();
}

module.exports = { Comments, getAllComments };
