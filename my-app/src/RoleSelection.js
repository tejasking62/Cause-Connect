import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RoleSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { action } = location.state;  // 'login' or 'signup'

  const handleNonProfit = () => {
    navigate('/login-signup', { state: { action, role: 'nonprofit' } });
  };

  const handleLeader = () => {
    navigate('/login-signup', { state: { action, role: 'leader' } });
  };

  return (
    <div className="role-selection-container">
      <h1>{action === 'login' ? 'Login' : 'Sign Up'}</h1>
      <p>Are you a Non-Profit or a Leader?</p>
      <button className="btn" onClick={handleNonProfit}>Non-Profit</button>
      <button className="btn" onClick={handleLeader}>Leader</button>
    </div>
  );
}

export default RoleSelection;
