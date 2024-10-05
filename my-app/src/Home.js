import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setErrorMessage('');
    console.log('Login successful!', { email, password });
    navigate('/dashboard');
  };

  const handleSignUp = () => {
    navigate('/role-selection');
  };

  const handleLinkedInSignUp = () => {
    console.log('LinkedIn sign up clicked');
    // Implement LinkedIn OAuth logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Implement forgot password logic here
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">CauseConnect</div>
          <ul className="navbar-menu">
            <li className="navbar-item">Home</li>
            <li className="navbar-item">Product</li>
            <li className="navbar-item">Pricing</li>
            <li className="navbar-item">Contact</li>
          </ul>
        </div>
        <button className="navbar-login" onClick={handleLogin}>Login</button>
      </nav>

      <div className="home-container">
        <div className="left-section">
          <h1>Match with Your Cause to Support <span>INSTANTLY</span></h1>
          <div className="nonprofit-section">
            <h2>Are you a <strong>Nonprofit?</strong></h2>

            <button className="nonprofit-button-small">Join our Database!</button>
          </div>
          <p className="subtitle">Connect with NGOs and make a difference in your community.</p>
        </div>

        <div className="right-section">
          <h2>Welcome to CauseConnect</h2>
          <button className="linkedin-button" onClick={handleLinkedInSignUp}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/023/986/970/original/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png"
              alt="LinkedIn logo"
              className="linkedin-icon"
            />
            Sign up with LinkedIn
          </button>
          <div className="divider">
            <span>OR</span>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="login-button" onClick={handleLogin}>Login</button>
            <button className="signup-button" onClick={handleSignUp}>Sign up</button>
          </form>
          <button className="forgot-password" onClick={handleForgotPassword}>
            Forgot your password?
          </button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-left">
          <span>&copy; 2024 CauseConnect. All rights reserved.</span>
        </div>
        <div className="footer-right">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;