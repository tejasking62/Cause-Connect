import React from 'react';
import { useNavigate } from 'react-router-dom';
import './roleselection.css'; // Import the CSS file

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate('/login-signup', { state: { action: 'signup', role } });
  };

  return (
    <div className="role-selection-container">
      <h1>Select Your Role for Sign Up</h1>
      <div className="button-container">
        <button className="btn" onClick={() => handleRoleSelection('nonprofit')}>Non-Profit</button>
        <button className="btn" onClick={() => handleRoleSelection('leader')}>Leader</button>
      </div>
    </div>
  );
}

export default RoleSelection;
