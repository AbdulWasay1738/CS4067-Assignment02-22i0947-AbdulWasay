// user-service/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Using the 'storage' option to specify where the SQLite DB file lives
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false // set to true if you want to see raw SQL logs
});

module.exports = sequelize;
