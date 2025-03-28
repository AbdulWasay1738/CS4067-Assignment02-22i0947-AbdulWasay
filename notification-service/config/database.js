// notification-service/config/database.js
require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB (Notification Service)');
  } catch (err) {
    console.error('MongoDB connection error (Notification Service):', err);
    process.exit(1); // Quit if connection fails
  }
}

module.exports = connectDB;
