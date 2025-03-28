// event-service/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');
// Example: user-service/app.js
//const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());  // or app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('Event Service is running!');
});

// Mount routes
app.use('/events', eventRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Event Service running on port ${PORT}`);
});

