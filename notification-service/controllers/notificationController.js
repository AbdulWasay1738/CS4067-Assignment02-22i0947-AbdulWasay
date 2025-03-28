// notification-service/controllers/notificationController.js
const Notification = require('../models/Notification');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
