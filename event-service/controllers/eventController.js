// event-service/controllers/eventController.js
const Event = require('../models/Event');

// GET all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET single event by ID
exports.getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// CREATE an event
exports.createEvent = async (req, res) => {
  try {
    const { name, date, location, totalSeats } = req.body;

    // Basic validation
    if (!name || !date || !location || !totalSeats) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEvent = new Event({
      name,
      date,
      location,
      totalSeats,
      availableSeats: totalSeats
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET event availability
exports.getAvailability = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).select('availableSeats');
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ availableSeats: event.availableSeats });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// eventController.js
exports.bookSeats = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { seatsToBook } = req.body; // e.g., { seatsToBook: 2 }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.availableSeats < seatsToBook) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    event.availableSeats -= seatsToBook;
    await event.save();

    return res.json({
      message: `Booked ${seatsToBook} seats. New availability = ${event.availableSeats}`,
      event
    });
  } catch (error) {
    console.error('Error in bookSeats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

