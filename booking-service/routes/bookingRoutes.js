// booking-service/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST /bookings - create a new booking
router.post('/', bookingController.createBooking);

// GET /bookings - optional to list all bookings
router.get('/', bookingController.getAllBookings);

// GET /bookings/:bookingId - optional to get a single booking
router.get('/:bookingId', bookingController.getBookingById);

module.exports = router;
