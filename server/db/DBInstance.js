const { Sequelize } = require("sequelize");
const { tedious } = require("tedious");
const env = require("../Environment");

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss");
};

const sequelize = new Sequelize(env.db_name, env.db_username, env.db_password, {
  host: env.db_host,
  dialect: "mssql",
  logging: false,
});

sequelize.config.dialectModule = tedious;

sequelize.sync().then(async () => {
  console.log("Database tables exist");
});

module.exports = sequelize;
