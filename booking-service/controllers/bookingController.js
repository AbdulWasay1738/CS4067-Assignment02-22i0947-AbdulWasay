// booking-service/controllers/bookingController.js
const axios = require('axios');
const Booking = require('../models/Booking');

let channel; // We'll set this from the main app

exports.setChannel = (rabbitChannel) => {
  channel = rabbitChannel;
};

exports.createBooking = async (req, res) => {
  try {
    const { userId, eventId, seatsBooked } = req.body;

    // 1) GET the event from the Event Service to check availability
    // Adjust the port (4000) if your Event Service is on a different port
    const eventResp = await axios.get(`http://localhost:4000/events/${eventId}`);
    const event = eventResp.data;

    if (!event._id) {
      return res.status(404).json({ error: 'Event not found' });
    }
    // Check if enough seats remain
    if (event.availableSeats < seatsBooked) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // 2) (Optional) Mock Payment here if needed
    // e.g. axios.post('http://localhost:5000/payments', {...})

    // 3) Create the booking in your Booking DB
    const booking = await Booking.create({
      userId,
      eventId,
      seatsBooked,
      status: 'CONFIRMED'
    });

    // 4) PATCH the Event Service to reduce seats
    await axios.patch(`http://localhost:4000/events/${eventId}/book`, {
      seatsToBook: seatsBooked
    });

    // 5) Publish to RabbitMQ if you have that set up
    if (channel) {
      const msg = {
        bookingId: booking.id,
        userId: booking.userId,
        status: booking.status,
        eventId: booking.eventId
      };
      channel.sendToQueue('booking_notifications', Buffer.from(JSON.stringify(msg)));
    }

    return res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error.message || error);
    // If the Event Service returned a 400, forward that message
    if (error.response && error.response.data) {
      return res.status(400).json({ error: error.response.data.error || 'Booking failed' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Optional: GET all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Optional: GET a single booking
exports.getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
