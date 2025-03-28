// notification-service/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const amqp = require('amqplib');
const connectDB = require('./config/database');
const Notification = require('./models/Notification');

// If you have routes:
 const notificationRoutes = require('./routes/notificationRoutes');

// Example: user-service/app.js
//const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); app.use(bodyParser.json());

const PORT = process.env.PORT || 6060;
const RABBITMQ_URI = process.env.RABBITMQ_URI || 'amqp://localhost';
const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || 'booking_notifications';

// Basic Health Check
app.get('/', (req, res) => {
  res.send('Notification Service is running!');
});

// Example inline GET route for notifications


// If you created an API for notifications:
 app.use('/notifications', notificationRoutes);

// Connect to MongoDB
connectDB();

// Connect to RabbitMQ & Consume Messages
async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URI);
    const channel = await connection.createChannel();
    await channel.assertQueue(RABBITMQ_QUEUE);

    console.log(`Connected to RabbitMQ, waiting for messages in queue: ${RABBITMQ_QUEUE}`);

    // Start consuming
    channel.consume(RABBITMQ_QUEUE, async (msg) => {
      if (msg !== null) {
        // Parse the incoming JSON
        const content = JSON.parse(msg.content.toString());
        console.log('Received message:', content);

        // Store notification in MongoDB
        await Notification.create({
          bookingId: content.bookingId,
          userId: content.userId,
          status: content.status,
          eventId: content.eventId,
          message: `Booking [${content.bookingId}] for user ${content.userId} is ${content.status}`
        });

        // Mock sending email or SMS here
        console.log(`Mock sending email or SMS to user ${content.userId} about booking ${content.bookingId}`);

        // Acknowledge the message so it is removed from the queue
        channel.ack(msg);
      }
    }, { noAck: false });
  } catch (error) {
    console.error('RabbitMQ connection error (Notification Service):', error);
  }
}

connectRabbitMQ();

// Start the server
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
// Example: user-service/app.js

