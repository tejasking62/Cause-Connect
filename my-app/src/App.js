// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nonprofits from './Nonprofits';  
import Leaders from './Leaders';  
import LeadersQuestionDisplay from './LeadersQuestionDisplay'; // Import LeadersQuestionDisplay
import NonprofitsQuestionDisplay from './NonprofitsQuestionDisplay'; // Import NonprofitsQuestionDisplay
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RoleSelection from './RoleSelection';
import LoginSignupForm from './LoginSignupForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/nonprofits">Nonprofits</Link></li>
            <li><Link to="/leaders">Leaders</Link></li>
            <li><Link to="/leaders-questions">Leaders Questions</Link></li> {/* Link to Leaders Questions */}
            <li><Link to="/nonprofits-questions">Nonprofits Questions</Link></li> {/* Link to Nonprofits Questions */}
          </ul>
        </nav>

        <Routes>
          <Route path="/nonprofits" element={<Nonprofits />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route path="/leaders-questions" element={<LeadersQuestionDisplay />} /> {/* Route for Leaders Questions */}
          <Route path="/nonprofits-questions" element={<NonprofitsQuestionDisplay />} /> {/* Route for Nonprofits Questions */}
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home page */}
        <Route path="/role-selection" element={<RoleSelection />} />  {/* Role selection page */}
        <Route path="/login-signup" element={<LoginSignupForm />} />  {/* Login/Sign-up form page */}
      </Routes>
    </Router>
  );
}

export default App;
