// event-service/config/database.js
require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB (Event Service)');
  } catch (err) {
    console.error('MongoDB connection error (Event Service):', err);
    process.exit(1); // Exit if DB connection fails
  }
}

module.exports = connectDB;
