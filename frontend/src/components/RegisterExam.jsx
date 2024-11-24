import React, { useState } from 'react';

const RegisterExam = () => {
  const exams = [
    { id: 1, name: 'SSE' },
    { id: 2, name: 'MDS' },
    { id: 3, name: 'OS' },
    { id: 4, name: 'MA' },
    { id: 5, name: 'INS' },
  ];

  const [selectedExams, setSelectedExams] = useState([]);

  const handleCheckboxChange = (examId) => {
    setSelectedExams((prevSelected) =>
      prevSelected.includes(examId)
        ? prevSelected.filter((id) => id !== examId) // Uncheck if already selected
        : [...prevSelected, examId] // Add if not selected
    );
  };

  const handleRegister = () => {
    if (selectedExams.length === 0) {
      alert('Please select at least one exam to register.');
      return;
    }
    console.log('Selected Exams:', selectedExams);
    alert('Exams registered successfully!');
    // Implement backend API call or further logic here
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
                  style={{ marginRight: '10px' }}
                />
                {exam.name}
              </label>
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default RegisterExam;
