// src/App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
        <p>This is a simple skeleton for a React application.</p>
      </header>
    </div>
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RoleSelection from './RoleSelection';
import LoginSignupForm from './LoginSignupForm';
import Dashboard from './Dashboard'; // Import the Dashboard component

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
