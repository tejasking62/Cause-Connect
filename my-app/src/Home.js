import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login-signup', { state: { action: 'login' } });
  };

  const handleSignUp = () => {
    navigate('/role-selection');  // No action needed, just navigate to role selection
  };

  return (
    <div>
      {/* Navbar */}
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
        <button className="navbar-login">Login</button>
      </nav>

      {/* Main Content */}
      <div className="home-container">
        {/* Left Section */}
        <div className="left-section">
          <h1>Match with Your Cause to Support <span>INSTANTLY</span></h1>
        </div>

        {/* Right Section (Login/Signup form) */}
        <div className="right-section">
          <h2>Welcome to CauseConnect</h2>
          <button className="linkedin-button">
            <img src="https://static.vecteezy.com/system/resources/previews/023/986/970/original/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png" alt="LinkedIn logo" /> Sign up with LinkedIn
          </button>
          <p>OR</p>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button onClick={handleSignUp}>Sign up</button>
          <div className="login-link">
            <a href="#" onClick={handleLogin}>Did you forget your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
