import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login-signup', { state: { action: 'login' } });
  };

  const handleSignUp = () => {
    navigate('/role-selection');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Spur Impact</h1>
      <p>Fostering connections for emerging leaders to engage in community involvement.</p>
      <blockquote>
        “A leader is not a title but a <strong>disposition</strong> where people follow you.”
      </blockquote>
      <p>
        Spur Impact helps bridge the gap between motivated leaders and nonprofit organizations.
        Whether you're a young professional seeking growth or a nonprofit looking for passionate board members, we are here to connect you.
      </p>
      <button className="btn" onClick={handleLogin}>Login</button>
      <button className="btn" onClick={handleSignUp}>Sign Up</button>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Spur Impact’s mission is to foster community involvement by connecting emerging leaders 
          with nonprofit organizations. We inspire and empower individuals to achieve professional 
          growth and make an impact in their communities.
        </p>
        <ul>
          <li><strong>Professional Development:</strong> Empowering leaders through events like MILLSUMMIT and the Impact Awards.</li>
          <li><strong>Community Impact:</strong> Connecting nonprofits with passionate individuals through initiatives like Delaware Gives and DoMore24 Delaware.</li>
          <li><strong>Organizational Development:</strong> Supporting nonprofits by building diverse, younger, and skilled boards.</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
