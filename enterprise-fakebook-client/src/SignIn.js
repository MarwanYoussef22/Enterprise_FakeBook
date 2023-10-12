import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  // const [employeeID, setEmployeeID] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = await fetch('/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "username":  e.target.username.value,
        "password": e.target.password.value
      })
    })
    .catch((error) => {
      console.log("Error logging in: ", error);
      setIsLoading(false);
      setError('Invalid username or password');
    });

    setIsLoading(false);
    const { employee_id } = await data.json();
    console.log('employee_id: ', employee_id);
    //TODO: Set Employee_ID globally? 
    //TODO: Navigate to Search Component
    navigate('/EmployeeSearch');
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Sign In
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignIn;