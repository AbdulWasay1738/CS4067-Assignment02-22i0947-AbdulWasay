import React, { useState, useEffect } from 'react';
import { getNotifications } from '../services/notificationService';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      setMessage(`Error fetching notifications: ${err.message}`);
    }
  }

  return (
    <div>
      <h2>Notifications</h2>
      {message && <p>{message}</p>}
      <ul>
        {notifications.map((nt, idx) => (
          <li key={idx}>
            BookingID: {nt.bookingId}, User: {nt.userId}, Status: {nt.status}, Msg: {nt.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;
