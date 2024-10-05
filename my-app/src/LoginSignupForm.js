import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

function LoginSignupForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { action, role } = location.state || {};

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${action} as a ${role} with`, { email, password });

    if (action === 'signup' && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (action === 'login') {
      navigate('/dashboard', { state: { role } });
    } else if (action === 'signup') {
      alert("Sign up successful! Please log in.");
      navigate('/', { state: { action: 'login' } });
    }
  };

  return (
    <div className="form-container">
      <h1>{action === 'login' ? 'Login' : 'Sign Up'} as {action === 'signup' ? role.charAt(0).toUpperCase() + role.slice(1) : ''}</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {action === 'signup' && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
        )}
        <button type="submit" className="btn">{action === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  );
}

export default LoginSignupForm;
