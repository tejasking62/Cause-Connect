import React, { useState } from 'react';
import './login.css'; // CSS file for styling

function LoginSignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role] = useState('leader');  // Role is fixed to leader for this example

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create new leader data
    const newLeader = {
      name,  
      email,
      password, 
      role,
    };

    try {
      const response = await fetch('http://localhost:5000/api/leaders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeader), 
      });

      const result = await response.json();

      if (response.ok) {
        alert("Sign up successful! Please log in.");
      } else {
        alert(result.error || 'Sign up failed.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error occurred while signing up.');
    }
  };

  return (
    <div className="form-container">
      <h1>Sign Up as Leader</h1>
      <form onSubmit={handleSubmit} className="form">

        {/* Name Field */}
        <div className="form-group">
          <label>Enter Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
}

export default LoginSignupForm;
