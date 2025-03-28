// booking-service/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './booking.db',
  logging: false // set to 'console.log' or true if you want SQL logs in the console
});

module.exports = sequelize;
