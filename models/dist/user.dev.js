"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var sequelize = require('../util/database');

var User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});
module.exports = User;