import React from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const { role } = location.state; // Retrieve the user's role from state

  return (
    <div>
      <h1>{role === 'nonprofit' ? 'Non-Profit Dashboard' : 'Leader Dashboard'}</h1>
      {role === 'nonprofit' ? <NonProfitForm /> : <LeaderForm />}
    </div>
  );
}

// Example form for Non-Profit users
const NonProfitForm = () => (
  <div>
    <h2>Non-Profit Specific Questions</h2>
    <form>
      <div>
        <label>Project Name: </label>
        <input type="text" required />
      </div>
      <div>
        <label>Funding Goal: </label>
        <input type="number" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
);

// Example form for Leader users
const LeaderForm = () => (
  <div>
    <h2>Leader Specific Questions</h2>
    <form>
      <div>
        <label>Leadership Style: </label>
        <input type="text" required />
      </div>
      <div>
        <label>Team Size: </label>
        <input type="number" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default Dashboard;
