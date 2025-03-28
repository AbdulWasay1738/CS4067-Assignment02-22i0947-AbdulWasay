import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // <-- for the Book Now link
import { createEvent, getAllEvents } from '../services/eventService';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    totalSeats: 50
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      setMessage(`Error fetching events: ${err.message}`);
    }
  }

  async function handleCreateEvent() {
    try {
      const created = await createEvent(newEvent);
      setMessage(`Event created: ${created.name}`);
      setNewEvent({ name: '', date: '', location: '', totalSeats: 50 });
      fetchEvents();
    } catch (err) {
      setMessage(`Error creating event: ${err.response?.data?.error || err.message}`);
    }
  }

  return (
    <div>
      <h2>Events</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input 
          placeholder="Event Name"
          value={newEvent.name}
          onChange={e => setNewEvent({ ...newEvent, name: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input 
          placeholder="Date (YYYY-MM-DD)"
          value={newEvent.date}
          onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input 
          placeholder="Location"
          value={newEvent.location}
          onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input 
          placeholder="Total Seats"
          type="number"
          value={newEvent.totalSeats}
          onChange={e => setNewEvent({ ...newEvent, totalSeats: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>

      {message && <p>{message}</p>}

      <ul>
        {events.map(ev => (
          <li key={ev._id}>
  <strong>ID:</strong> {ev._id} |{" "}
  <strong>Name:</strong> {ev.name} |{" "}
  <strong>Date:</strong> {ev.date} |{" "}
  <strong>Location:</strong> {ev.location} |{" "}
  <strong>Available:</strong> {ev.availableSeats === 0 ? "No seats available" : ev.availableSeats} |{" "}
  
  <Link to={`/bookings?eventId=${ev._id}`}>
    Book Now
  </Link>
</li>

        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
