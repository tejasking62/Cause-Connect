import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

function LoginSignupForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { action, role } = location.state || { action: 'login', role: 'user' }; // Default values

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(''); // Add name state for signup

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve stored user from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (action === 'login') {
      // Check if credentials match
      if (storedUser && email === storedUser.email && password === storedUser.password) {
        alert("Login successful!");
        navigate('/dashboard', { state: { role: storedUser.role } });
      } else {
        alert("Invalid email or password.");
      }
    } else if (action === 'signup') {
      // Validate password confirmation
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const newUser = {
        email,
        password,
        role // Assuming role comes from state
      };

      // Store new user in local storage
      localStorage.setItem('user', JSON.stringify(newUser));
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
        {action === 'signup' && (
          <div className="form-group">
            <label>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
        )}
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
