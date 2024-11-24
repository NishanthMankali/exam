import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [hallTicket, setHallTicket] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/login', {
        hallTicketNumber: hallTicket,
        password: password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Store the JWT token in localStorage
        localStorage.setItem('authToken', token);

        setSuccess('Login successful!');
        setTimeout(() => {
          window.location.href = '/RegisterExam'; // Redirect to Register Exam page
        }, 1500); // Delay for user feedback
      }
    } catch (err) {
      setError(
        err.response && err.response.data.error
          ? err.response.data.error
          : 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="hallTicket" style={{ display: 'block', marginBottom: '5px' }}>
            Hall Ticket Number
          </label>
          <input
            type="text"
            id="hallTicket"
            value={hallTicket}
            onChange={(e) => setHallTicket(e.target.value)}
            placeholder="Enter your Hall Ticket Number"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
      <p>Default password is 'test123'</p>
      <p>If you forgot your password please contact admin.</p>
    </div>
  );
};

export default Login;
