import React from 'react';
import { useLocation } from 'react-router-dom';
import './dashboard.css'; // Import the CSS file

function Dashboard() {
  const location = useLocation();
  const { role } = location.state; // Retrieve the user's role from state

  return (
    <div className="dashboard-container">
      <h1>{role === 'nonprofit' ? 'Non-Profit Dashboard' : 'Leader Dashboard'}</h1>
      {role === 'nonprofit' ? <NonProfitForm /> : <LeaderForm />}
    </div>
  );
}

// Example form for Non-Profit users
const NonProfitForm = () => (
  <div className="form-section">
    <h2>Non-Profit Specific Questions</h2>
    <form>
      <div className="form-group">
        <label>Project Name: </label>
        <input type="text" required />
      </div>
      <div className="form-group">
        <label>Funding Goal: </label>
        <input type="number" required />
      </div>
      <button type="submit" className="btn">Submit</button>
    </form>
  </div>
);

// Example form for Leader users
const LeaderForm = () => (
  <div className="form-section">
    <h2>Leader Specific Questions</h2>
    <form>
      <div className="form-group">
        <label>Leadership Style: </label>
        <input type="text" required />
      </div>
      <div className="form-group">
        <label>Team Size: </label>
        <input type="number" required />
      </div>
      <button type="submit" className="btn">Submit</button>
    </form>
  </div>
);

export default Dashboard;
