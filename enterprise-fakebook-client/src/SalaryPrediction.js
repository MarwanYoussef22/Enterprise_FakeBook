import React, { useState } from 'react';
import axios from 'axios';

const SalaryPrediction = () => {
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [predictedSalary, setPredictedSalary] = useState(null);

  const handlePredictSalary = async () => {
    try {
      const response = await axios.post('/api/salary-prediction', {
        jobRole,
        location,
      });
      setPredictedSalary(response.data.predictedSalary);
    } catch (error) {
      console.error('Error predicting salary:', error);
    }
  };

  return (
    <div>
      <h2>Salary Prediction</h2>
      <div>
        <label htmlFor="jobRole">Job Role: </label>
        <input
          type="text"
          id="jobRole"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button onClick={handlePredictSalary}>Predict Salary</button>
      {predictedSalary !== null && (
        <div>
          <p>Predicted Salary: ${predictedSalary}</p>
        </div>
      )}
    </div>
  );
};

export default SalaryPrediction;