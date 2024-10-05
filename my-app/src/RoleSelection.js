import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate('/login-signup', { state: { action: 'signup', role } });
  };

  return (
    <div>
      <h1>Select Your Role for Sign Up</h1>
      <button onClick={() => handleRoleSelection('nonprofit')}>Non-Profit</button>
      <button onClick={() => handleRoleSelection('leader')}>Leader</button>
    </div>
  );
}

export default RoleSelection;
