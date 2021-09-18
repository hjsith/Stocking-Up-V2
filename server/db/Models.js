const { DataTypes, Op } = require("sequelize");
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
    InvestorEmail: DataTypes.STRING,
    InvestorPassword: DataTypes.TEXT,
    Username: DataTypes.TEXT,
    NetWorth: DataTypes.BIGINT,
    InvestorRanking: DataTypes.INTEGER,
    InvestorDifficulty: DataTypes.TEXT,
    DateJoined: DataTypes.DATEONLY,
    Title: DataTypes.TEXT,
  },
  { sequelize: db, tableName: "Investor", timestamps: false }
);

const Listing = db.define(
  "Listing",
  {
    ListingID: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    ListingName: DataTypes.TEXT,
    ListingIndustry: DataTypes.TEXT,
    VolumeShares: DataTypes.BIGINT,
    MarketCap: DataTypes.BIGINT,
    ClosingPrice: DataTypes.DECIMAL(10, 2),
    YearHighPrice: DataTypes.DECIMAL(10, 2),
    YearLowPrice: DataTypes.DECIMAL(10, 2),
  },
  { sequelize: db, tableName: "Listing", timestamps: false }
);

const Price = db.define(
  "Price",
  {
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    CurrentPrice: DataTypes.DECIMAL(10, 2),
  },
  { sequelize: db, tableName: "Price", timestamps: false }
);

const OneDay = db.define(
  "OneDay",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    PastPrice: DataTypes.DECIMAL(10, 2),
    DateTimeOfPrice: DataTypes.DATE,
  },
  { sequelize: db, tableName: "OneDay", timestamps: false }
);

const FiveDays = db.define(
  "FiveDays",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    PastPrice: DataTypes.DECIMAL(10, 2),
    DateTimeOfPrice: DataTypes.DATE,
  },
  { sequelize: db, tableName: "FiveDays", timestamps: false }
);

const TwoWeeks = db.define(
  "TwoWeeks",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    PastPrice: DataTypes.DECIMAL(10, 2),
    DateTimeOfPrice: DataTypes.DATE,
  },
  { sequelize: db, tableName: "TwoWeeks", timestamps: false }
);

const OneMonth = db.define(
  "OneMonth",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    PastPrice: DataTypes.DECIMAL(10, 2),
    DateTimeOfPrice: DataTypes.DATE,
  },
  { sequelize: db, tableName: "OneMonth", timestamps: false }
);

const Achievements = db.define(
  "Achievements",
  {
    AchievementID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: DataTypes.STRING,
    Description: DataTypes.STRING,
    MedalImage: DataTypes.BLOB,
  },
  { sequelize: db, tableName: "Achievements", timestamps: false }
);

const ObtainedAchievements = db.define(
  "ObtainedAchievements",
  {
    AchievementID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    InvestorID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    DateAchieved: DataTypes.DATE,
  },
  { sequelize: db, tableName: "ObtainedAchievements", timestamps: false }
);

const Watchlist = db.define(
  "Watchlist",
  {
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
  },
  { tableName: "Watchlist", timestamps: false }
);

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

const Holding = db.define(
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

const AuthenticationTokens = db.define(
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
  { sequelize: db, tableName: "AuthenticationTokens", timestamps: false }
);

const Threads = db.define(
  "Threads",
  {
    ThreadID: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    ListingID: {
      type: DataTypes.STRING(10),
      references: {
        model: Listing,
        key: "ListingID",
      },
    },
    Title: DataTypes.TEXT,
    Description: DataTypes.TEXT,
  },
  { sequelize: db, tableName: "Threads", timestamps: false }
);

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

const Articles = db.define(
  "Articles",
  {
    ArticleID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    ArticleName: DataTypes.TEXT,
    ArticleDate: DataTypes.DATE,
    ArticleInfo: DataTypes.TEXT,
  },
  { sequelize: db, tableName: "Articles", timestamps: false }
);

const Friends = db.define(
  "Friends",
  {
    FriendID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    RequestingUsername: DataTypes.STRING,
    AcceptingUsername: DataTypes.STRING,
    Status: DataTypes.BOOLEAN,
  },
  { sequelize: db, tableName: "Friends", timestamps: false }
);

Investor.hasMany(Watchlist, { foreignKey: "InvestorID" });
Investor.hasMany(Holding, { foreignKey: "InvestorID" });
Investor.hasMany(ObtainedAchievements, { foreignKey: "InvestorID" });
Investor.hasMany(Order, { foreignKey: "InvestorID" });
Investor.hasMany(Friends, { foreignKey: "RequestingUsername" });
Investor.hasMany(Friends, { foreignKey: "AcceptingUsername" });
Investor.hasMany(Comments, { foreignKey: "InvestorID" });
Investor.hasMany(AuthenticationTokens, { foreignKey: "InvestorID" });

//Listing
Listing.hasMany(Order, { foreignKey: "ListingID" });
Listing.hasMany(Holding, { foreignKey: "ListingID" });
Listing.hasOne(Threads, { foreignKey: "ListingID" });
Listing.hasMany(Watchlist, { foreignKey: "ListingID" });
Listing.hasMany(OneDay, { foreignKey: "ListingID" });
Listing.hasMany(FiveDays, { foreignKey: "ListingID" });
Listing.hasMany(TwoWeeks, { foreignKey: "ListingID" });
Listing.hasMany(OneMonth, { foreignKey: "ListingID" });
Listing.hasOne(Price, { foreignKey: "ListingID" });

//OneDay
OneDay.belongsTo(Listing, { foreignKey: "ListingID" });

//Five Days
FiveDays.belongsTo(Listing, { foreignKey: "ListingID" });

//Two Weeks
TwoWeeks.belongsTo(Listing, { foreignKey: "ListingID" });

//One Month
OneMonth.belongsTo(Listing, { foreignKey: "ListingID" });

//Price
Price.belongsTo(Listing, { foreignKey: "ListingID" });

//Achievements
Achievements.hasMany(ObtainedAchievements, { foreignKey: "AchievementID" });

//Obtained Achievements
ObtainedAchievements.belongsTo(Investor, { foreignKey: "InvestorID" });
ObtainedAchievements.belongsTo(Achievements, { foreignKey: "AchievementID" });

//Watchlist
Watchlist.belongsTo(Listing, { foreignKey: "ListingID" });
Watchlist.belongsTo(Investor, { foreignKey: "InvestorID" });

//Order
Order.belongsTo(Listing, { foreignKey: "ListingID" });
Order.belongsTo(Investor, { foreignKey: "InvestorID" });
Order.hasMany(Holding, { foreignKey: "OrderID" });

//Holding
Holding.belongsTo(Listing, { foreignKey: "ListingID" });
Holding.belongsTo(Order, { foreignKey: "OrderID" });
Holding.belongsTo(Investor, { foreignKey: "InvestorID" });

//Authentication Tokens
AuthenticationTokens.belongsTo(Investor, { foreignKey: "InvestorID" });

//Threads
Threads.belongsTo(Listing, { foreignKey: "ListingID" });
Threads.hasMany(Comments, { foreignKey: "ThreadID" });

//Comments
Comments.belongsTo(Threads, { foreignKey: "ThreadID" });
Comments.belongsTo(Investor, { foreignKey: "InvestorID" });

//Friends
Friends.belongsTo(Investor, { foreignKey: "RequestingUsername" });
Friends.belongsTo(Investor, { foreignKey: "AcceptingUsername" });

module.exports = {
  Investor,
  Listing,
  Price,
  OneDay,
  FiveDays,
  TwoWeeks,
  OneMonth,
  Achievements,
  ObtainedAchievements,
  Watchlist,
  Order,
  Holding,
  AuthenticationTokens,
  Threads,
  Comments,
  Articles,
  Friends,
};
