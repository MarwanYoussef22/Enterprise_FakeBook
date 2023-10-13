import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'

const SignIn = (props) => {
  const {onSignIn} = props;
  const navigate = useNavigate();
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
    //Set Employee_ID
    onSignIn(employee_id);
    //Navigate to Search Component
    navigate('/search');
  };

  return (
    <div>
      <p className='title'>Enterprise Fakebook</p>
    <div className='sign-in-card'>
      <form onSubmit={handleSignIn}>
        <div>
          {/* <label htmlFor="username">Username:</label> */}
          <input
            type="text"
            id="username"
            name="username"
            placeholder='username'
            autoFocus='1'
          />
        </div>
        <div>
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder='password'
          />
        </div>
        <button type="submit" disabled={isLoading} className='submit-button'>
          Sign In
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
};

export default SignIn;