import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function LoginSignupForm() {
  const location = useLocation();
  const { action, role } = location.state;  // 'login' or 'signup' and 'nonprofit' or 'leader'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${action} as a ${role} with`, { email, password });
    // Add logic for login/signup via API
  };

  return (
    <div>
      <h1>{action === 'login' ? 'Login' : 'Sign Up'} as {role === 'nonprofit' ? 'Non-Profit' : 'Leader'}</h1>
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
        <button type="submit">{action === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
    </div>
  );
}

export default LoginSignupForm;
