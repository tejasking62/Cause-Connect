import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <p>Select whether to log in or sign up as a Non-Profit or a Leader:</p>
      <div className="buttons">
        <Link to="/nonprofits" className="btn">Non-Profit Login/Sign Up</Link>
        <Link to="/leaders" className="btn">Leader Login/Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
