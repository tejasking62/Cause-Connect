<<<<<<< HEAD
import React, { useState } from 'react';

function Leaders() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leader logged in/signing up with", { email, password });
  };

  return (
    <div>
      <h1>Leader Login/Sign Up</h1>
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
        <button type="submit">Submit</button>
      </form>
=======
import React from 'react';

function Leaders() {
  return (
    <div>
      <h1>Leaders Page</h1>
      <p>Meet the leaders who are making an impact in the nonprofit space.</p>
>>>>>>> origin/tejas
    </div>
  );
}

export default Leaders;
