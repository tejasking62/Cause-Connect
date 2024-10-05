import React, { useState } from 'react';
import resultsJSON from './gpt.json'; // Adjust the path as needed

const MatchCard = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-300 rounded-md shadow-md p-4 mb-4 bg-white">
      <h3 className="text-xl font-bold">{match.nonprofit_name}</h3>
      <p className="text-gray-600">{match.location} / {match.category}</p>
      <p className="mt-2 text-gray-800">{match.nonprofit_summary}</p>
      <div className="flex justify-between items-center mt-2">
        <div className="text-lg font-semibold text-green-700">{match.match_percentage}% Match</div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:underline"
        >
          {isExpanded ? 'Hide Explanation' : 'Show Explanation'}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-2 p-2 bg-gray-200 rounded-md">
          {match.explanation}
        </div>
      )}
    </div>
  );
};

export default function Results() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">CauseConnect Results</h1>

        <input
          type="text"
          placeholder="Search Nonprofits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-3 border border-gray-300 rounded-md w-full md:w-1/3 mx-auto"
        />

        <div>
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
    </div>
  );
}
