const { Sequelize } = require("sequelize");
const db = require("../config/db");

const { DataTypes } = Sequelize;

const Social = db.define(
  "social",
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    link: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Social;

(async () => {
  await db.sync();
})();
