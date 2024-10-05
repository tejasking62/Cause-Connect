import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RoleSelection from './RoleSelection';
import LoginSignupForm from './LoginSignupForm';
=======
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nonprofits from './Nonprofits';  
import Leaders from './Leaders'; 
import Signin from './Signin';
>>>>>>> b2aca4b (sign in)

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home page */}
        <Route path="/role-selection" element={<RoleSelection />} />  {/* Role selection page */}
        <Route path="/login-signup" element={<LoginSignupForm />} />  {/* Login/Sign-up form page */}
      </Routes>
=======
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
>>>>>>> b2aca4b (sign in)
    </Router>
  );
}

export default App;
