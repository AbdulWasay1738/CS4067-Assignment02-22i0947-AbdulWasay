// event-service/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET /events - Retrieve all events
router.get('/', eventController.getAllEvents);

// GET /events/:eventId - Get a single event
router.get('/:eventId', eventController.getEventById);

// POST /events - Create a new event
router.post('/', eventController.createEvent);

// GET /events/:eventId/availability - Check availability
router.get('/:eventId/availability', eventController.getAvailability);

// eventRoutes.js
router.patch('/:eventId/book', eventController.bookSeats);

module.exports = router;
