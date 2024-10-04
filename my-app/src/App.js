// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nonprofits from './Nonprofits';  
import Leaders from './Leaders';        

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/nonprofits">Nonprofits</Link></li>
            <li><Link to="/leaders">Leaders</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/nonprofits" element={<Nonprofits />} />  {/* Nonprofits route */}
          <Route path="/leaders" element={<Leaders />} />        {/* Leaders route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


