const { Sequelize } = require("sequelize");
const db = require("../config/db");

const { DataTypes } = Sequelize;

const Content = db.define(
  "content",
  {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    _menuid: DataTypes.INTEGER,
    _heading: DataTypes.STRING,
    _sub_heading: DataTypes.STRING,
    _title: DataTypes.STRING,
    _sub_title: DataTypes.STRING,
    _description: DataTypes.TEXT,
    _button: DataTypes.STRING,
    _link: DataTypes.STRING,
    _serial: DataTypes.INTEGER,
    _status: DataTypes.TINYINT,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Content;

(async () => {
  await db.sync();
})();
