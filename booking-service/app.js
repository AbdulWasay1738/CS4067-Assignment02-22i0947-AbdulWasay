// booking-service/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
const sequelize = require('./config/database');
const bookingController = require('./controllers/bookingController');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
// Example: user-service/app.js
//const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('Booking Service (SQLite) is running!');
});

// Payment mock route
app.use('/payments', paymentRoutes);

// Booking routes
app.use('/bookings', bookingRoutes);

// Connect to RabbitMQ
let channel;
async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    channel = await connection.createChannel();
    await channel.assertQueue('booking_notifications');
    console.log('RabbitMQ connected, queue "booking_notifications" asserted');

    // Provide channel to bookingController
    bookingController.setChannel(channel);
  } catch (err) {
    console.error('RabbitMQ connection error:', err);
  }
}

// Sync SQLite DB and start server
sequelize.sync()
  .then(() => {
    console.log('SQLite DB synced for Booking Service');
    connectRabbitMQ();
    app.listen(PORT, () => {
      console.log(`Booking Service running on port ${PORT}`);
      console.log(`Using SQLite file: ${process.env.DB_STORAGE}`);
    });
  })
  .catch(err => {
    console.error('DB sync failed:', err);
  });
 // This must be called before defining routes

