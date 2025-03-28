// booking-service/models/Booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  eventId: {
    type: DataTypes.STRING, // or TEXT if eventId is a longer string
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING'
  },
  seatsBooked: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'bookings',
  timestamps: true
});

module.exports = Booking;
