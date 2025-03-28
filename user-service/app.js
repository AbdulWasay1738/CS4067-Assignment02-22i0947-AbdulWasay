// user-service/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

// Example: user-service/app.js
//const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); const PORT = process.env.PORT || 3001;

// Use bodyParser or express.json() to parse JSON requests
app.use(bodyParser.json());

// Basic test endpoint
app.get('/', (req, res) => {
  res.send('User Service is running with SQLite!');
});

// Mount user routes at /users
app.use('/users', userRoutes);

// Sync DB and start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`User Service running on port ${PORT}`);
      console.log(`SQLite DB file: ${process.env.DB_STORAGE}`);
    });
  })
  .catch((err) => {
    console.error('Database sync failed:', err);
  });



