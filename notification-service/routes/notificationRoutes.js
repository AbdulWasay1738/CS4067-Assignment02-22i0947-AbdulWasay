// notification-service/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// GET all notifications
router.get('/', notificationController.getAllNotifications);

module.exports = router;
