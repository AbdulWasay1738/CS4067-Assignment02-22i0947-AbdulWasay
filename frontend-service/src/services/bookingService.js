import axios from 'axios';

const BOOKING_URL = process.env.REACT_APP_BOOKING_URL || 'http://localhost:5000';

export async function createBooking(data) {
  const resp = await axios.post(`${BOOKING_URL}/bookings`, data);
  
  return resp.data; // the created booking object
}

export async function getAllBookings() {
  const resp = await axios.get(`${BOOKING_URL}/bookings`);
  return resp.data; // array of bookings
}
