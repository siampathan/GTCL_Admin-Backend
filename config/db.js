const { Sequelize } = require("sequelize");

const db = new Sequelize("gtcl_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
