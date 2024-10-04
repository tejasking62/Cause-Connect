// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nonprofits from './Nonprofits';  
import Leaders from './Leaders'; 
import Signin from './Signin';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/nonprofits">Nonprofits</Link></li>
            <li><Link to="/leaders">Leaders</Link></li>
            <li><Link to="/Signin">signin</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/nonprofits" element={<Nonprofits />} />  {/* Nonprofits route */}
          <Route path="/leaders" element={<Leaders />} />        {/* Leaders route */}
          <Route path="/Signin" element={<Signin />} />          {/* Sign In route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


