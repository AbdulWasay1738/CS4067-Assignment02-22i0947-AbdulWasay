import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/userService';

function UserAuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await registerUser(username, password);
      setMessage(`Register success: ${res.message}`);
    } catch (err) {
      setMessage(`Register error: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(username, password);
      setMessage(`Login success: ${res.message}`);
      // e.g., store res.token in localStorage if you want to authenticate subsequent calls
      // localStorage.setItem('token', res.token);
    } catch (err) {
      setMessage(`Login error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div>
      <h2>User Authentication</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input 
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input 
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserAuthPage;
