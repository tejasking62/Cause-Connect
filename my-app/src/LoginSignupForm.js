import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginSignupForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { action, role } = location.state;  // 'login' or 'signup' and 'nonprofit' or 'leader'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  // Added for sign-up

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${action} as a ${role} with`, { email, password });

    // Add logic for login/signup via API
    if (action === 'signup' && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Here you would normally send the login or signup request to your API

    // If signup is successful, redirect to login
    if (action === 'signup') {
      alert("Sign up successful! Please log in.");
      navigate('/', { state: { action: 'login' } }); // Redirect to login page
    }
  };

  return (
    <div>
      <h1>{action === 'login' ? 'Login' : 'Sign Up'} as {action === 'signup' ? role.charAt(0).toUpperCase() + role.slice(1) : ''}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {action === 'signup' && (  // Conditionally render confirm password for signup
          <div>
            <label>Confirm Password: </label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
        )}
        <button type="submit">{action === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  );
}

export default LoginSignupForm;
