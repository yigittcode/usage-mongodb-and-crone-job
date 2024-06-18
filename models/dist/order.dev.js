"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var sequelize = require('../util/database');

var Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});
module.exports = Order;