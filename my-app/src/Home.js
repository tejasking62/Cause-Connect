import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login-signup', { state: { action: 'login' } });
  };

  const handleSignUp = () => {
    navigate('/role-selection');  // No action needed, just navigate to role selection
  };

  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <p>Please choose to log in or sign up:</p>
      <button className="btn" onClick={handleLogin}>Login</button>
      <button className="btn" onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default Home;
