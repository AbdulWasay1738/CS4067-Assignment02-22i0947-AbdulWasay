import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserAuthPage from './routes/UserAuthPage';
import EventsPage from './routes/EventsPage';
import BookingPage from './routes/BookingPage';
import NotificationsPage from './routes/NotificationsPage';

function App() {
  return (
    <div style={{ margin: '1rem' }}>
      <nav style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/auth" style={{ marginRight: '1rem' }}>User Auth</Link>
        <Link to="/events" style={{ marginRight: '1rem' }}>Events</Link>
        <Link to="/bookings" style={{ marginRight: '1rem' }}>Bookings</Link>
        <Link to="/notifications" style={{ marginRight: '1rem' }}>Notifications</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h2>Welcome to the Event Booking Frontend</h2>} />
        <Route path="/auth" element={<UserAuthPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </div>
  );
}

export default App;
