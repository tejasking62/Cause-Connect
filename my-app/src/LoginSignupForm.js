import React, { useState } from 'react';
import './login.css'; // CSS file for styling

function LoginSignupForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { action, role } = location.state || { action: 'login', role: 'user' }; // Default values

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(''); // Add name state for signup

  // Submit form handler
  const handleSubmit = async (e) => {
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
