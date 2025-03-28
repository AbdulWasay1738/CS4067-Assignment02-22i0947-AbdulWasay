import axios from 'axios';

const EVENT_URL = process.env.REACT_APP_EVENT_URL || 'http://localhost:4000';

export async function createEvent(eventData) {
  const resp = await axios.post(`${EVENT_URL}/events`, eventData);
  return resp.data;
}

export async function getAllEvents() {
  const resp = await axios.get(`${EVENT_URL}/events`);
  return resp.data; // an array of event objects
}
