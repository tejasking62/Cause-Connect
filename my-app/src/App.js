import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nonprofits from './Nonprofits';
import Leaders from './Leaders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home route */}
        <Route path="/nonprofits" element={<Nonprofits />} />  {/* Nonprofits route */}
        <Route path="/leaders" element={<Leaders />} />  {/* Leaders route */}
      </Routes>
    </Router>
  );
}

export default App;
