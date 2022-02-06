const Sequelize  = require("sequelize");
const db = require("../db");

class Users extends Sequelize.Model {}
Users.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  { sequelize: db, modelName: "users" }
);

module.exports = Users;
