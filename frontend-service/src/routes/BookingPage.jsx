import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createBooking, getAllBookings } from '../services/bookingService';

function BookingPage() {
  const [searchParams] = useSearchParams();
  const preSelectedEventId = searchParams.get('eventId') || '';

  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    eventId: preSelectedEventId,
    seatsBooked: 1
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      setMessage(`Error fetching bookings: ${err.message}`);
    }
  }

// bookingPage example snippet
async function handleCreateBooking() {
  try {
    const res = await createBooking(formData);
    setMessage(`Booking created. ID=${res.id}, Status=${res.status}`);
    fetchBookings();
  } catch (err) {
    // If the server returns a 400 with an error, show it
    const errorMsg = err.response?.data?.error || err.message;
    setMessage(`Error creating booking: ${errorMsg}`);
  }
}


  return (
    <div>
      <h2>Booking</h2>
      <div>
        <input 
          placeholder="User ID"
          value={formData.userId}
          onChange={e => setFormData({ ...formData, userId: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input 
          placeholder="Event ID"
          value={formData.eventId}
          onChange={e => setFormData({ ...formData, eventId: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <input 
          type="number"
          placeholder="Seats"
          value={formData.seatsBooked}
          onChange={e => setFormData({ ...formData, seatsBooked: e.target.value })}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleCreateBooking}>Create Booking</button>
      </div>
      {message && <p>{message}</p>}
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            Booking ID: {b.id}, User: {b.userId}, Event: {b.eventId}, Status: {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingPage;
