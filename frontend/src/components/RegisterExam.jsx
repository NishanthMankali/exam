import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterExam = () => {
  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  // Fetch available exams from the backend
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/available-exams');
        setExams(response.data.exams);
      } catch (err) {
        console.error('Error fetching exams:', err);
      }
    };

    fetchExams();
  }, []);

  const handleCheckboxChange = (examId) => {
    setSelectedExams((prevSelected) =>
      prevSelected.includes(examId)
        ? prevSelected.filter((id) => id !== examId)
        : [...prevSelected, examId]
    );
  };

  const handleRegister = async () => {
    if (selectedExams.length === 0) {
      alert('Please select at least one exam to register.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register-exam', {
        exams: selectedExams,
      });

      if (response.status === 200) {
        setSuccess('Exams registered successfully!');
        setSelectedExams([]);
        // Refresh available exams
        setExams(response.data.exams);
      }
    } catch (err) {
      setError('Error registering exams. Please try again.');
    }
  };

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setSuccess('Password updated successfully!');
        setIsPasswordModalOpen(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Register for Exams</h2>
      <form>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          {exams.map((exam) => (
            <div key={exam.id} style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  value={exam.id}
                  checked={selectedExams.includes(exam.id)}
                  onChange={() => handleCheckboxChange(exam.id)}
                  disabled={exam.registered} // Disable if the exam is already registered
                  style={{ marginRight: '10px' }}
                />
                {exam.name} {exam.registered && '(Already Registered)'}
              </label>
            </div>
          ))}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button
          type="button"
          onClick={handleRegister}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
      <button
        onClick={() => setIsPasswordModalOpen(true)}
        style={{
          marginTop: '20px',
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Change Password
      </button>

      {isPasswordModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h3>Change Password</h3>
          <div>
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleChangePassword}>Submit</button>
          <button onClick={() => setIsPasswordModalOpen(false)} style={{ marginLeft: '10px' }}>
            Close
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      )}
    </div>
  );
};

export default RegisterExam;
