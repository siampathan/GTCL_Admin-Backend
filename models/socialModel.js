const { Sequelize } = require("sequelize");

const db = new Sequelize("gtcl_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

//model section
const { DataTypes } = Sequelize;

const Social = db.define(
  "social",
  {
    _name: DataTypes.STRING,
    _image: DataTypes.STRING,
    _url: DataTypes.STRING,
    _link: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Social;

(async () => {
  await db.sync();
})();
