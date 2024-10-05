import React, { useState } from 'react';
import resultsJSON from './gpt.json'; // Adjust the path as needed
import './Results.css'; // Import the CSS file
import logo from './cconnect.png'; // Import the logo

const MatchCard = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="match-card">
      <div className="match-info">
        <h3 className="text-xl font-bold">{match.nonprofit_name}</h3>
        <p className="text-gray-600">{match.location} / {match.category}</p>
        <p className="mt-2 text-gray-800">{match.nonprofit_summary}</p>
      </div>
      <div className="match-percentage">
        <div className="percentage-circle">
          {match.match_percentage}%
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:underline mt-2"
        >
          {isExpanded ? 'Hide Explanation' : 'Show Explanation'}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-2 p-2 bg-gray-200 rounded-md w-full">
          {match.explanation}
        </div>
      )}
    </div>
  );
};

export default function Results() {
  const [searchTerm, setSearchTerm] = useState('');
  const userName = "Your Name"; // Replace this with dynamic user name as needed

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <img src={logo} alt="Logo" className="logo" /> {/* Now using the CSS class */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Hey, here are your TOP MATCHES!
        </h1>
      </div>

      <input
        type="text"
        placeholder="Search Nonprofits..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-md w-full md:w-1/3 mx-auto"
      />
      <div className="w-full">
        {resultsJSON
          .filter(match => 
            match.nonprofit_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => b.match_percentage - a.match_percentage) // Sort by match percentage descending
          .map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
      </div>
    </div>
  );
}
