// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nonprofits from './Nonprofits';  
import Leaders from './Leaders';  
import LeadersQuestionDisplay from './LeadersQuestionDisplay'; // Import LeadersQuestionDisplay
import NonprofitsQuestionDisplay from './NonprofitsQuestionDisplay'; // Import NonprofitsQuestionDisplay

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
    </Router>
  );
}

export default App;
