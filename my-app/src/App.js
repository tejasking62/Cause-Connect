import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RoleSelection from './RoleSelection';
import LoginSignupForm from './LoginSignupForm';
import Dashboard from './Dashboard'; // Import the Dashboard component
import React from 'react';
import Results from './Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home page */}
        <Route path="/role-selection" element={<RoleSelection />} />  {/* Role selection page */}
        <Route path="/login-signup" element={<LoginSignupForm />} />  {/* Login/Sign-up form page */}
        <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard page */}
      </Routes>
    </Router>
  );
}

export default App;