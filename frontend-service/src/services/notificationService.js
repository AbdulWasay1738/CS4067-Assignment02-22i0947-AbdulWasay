import axios from 'axios';

const NOTIFICATION_URL = process.env.REACT_APP_NOTIFICATION_URL || 'http://localhost:6060';

export async function getNotifications() {
  const resp = await axios.get(`${NOTIFICATION_URL}/notifications`);
  return resp.data; // array of notifications
}
