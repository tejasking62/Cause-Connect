import React, { useState } from 'react';

const resultsJSON = [
  {
    candidate_name: "Alex",
    nonprofit_name: "Nonprofit C",
    nonprofit_summary: "Nonprofit C is a mission-driven organization focused on healthcare and mental care. They are currently seeking individuals skilled in social media to boost their impact. The organization highly values contributions in community outreach and prefers candidates who are available on Wednesdays. Nonprofit C operates on a medium scale with regional or national impact and is open to individuals without prior board service.",
    category: "Healthcare and mental care",
    location: "Other",
    match_percentage: 60.0,
    explanation: "Match Percentage: 60%\n\nExplanation: \n\nThe candidate and Nonprofit C share a common interest in mental health, which is a strong basis for their compatibility. The candidate's skills in marketing and technology could potentially be applied to the social media skills that Nonprofit C is seeking."
  },
  {
    candidate_name: "Alex",
    nonprofit_name: "Nonprofit B",
    nonprofit_summary: "Nonprofit B is a globally reaching organization dedicated to healthcare and mental care. They are currently looking for individuals skilled in Project Management to amplify their impact. They value contributions in Strategy and Governance and prefer candidates who are available on Wednesdays. The organization is open to accepting individuals without prior board service.",
    category: "Healthcare and mental care",
    location: "New Jersey",
    match_percentage: 60.0,
    explanation: "Match Percentage: 60%\n\nExplanation: \n\nThe candidate and Nonprofit B share a common interest in Mental Health, which is a good starting point for compatibility. The candidate's skills in Project Management also align with what the nonprofit is currently seeking."
  },
  {
    candidate_name: "Alex",
    nonprofit_name: "Nonprofit A",
    nonprofit_summary: "Nonprofit A is a mission-driven organization focused on education. They are currently seeking individuals skilled in project management to help enhance their local impact. The organization highly values contributions in community outreach and prefers candidates who are available on Mondays.",
    category: "Education",
    location: "Other",
    match_percentage: 90.0,
    explanation: "Match Percentage: 90%\n\nExplanation: \n\nThe candidate and Nonprofit A are highly compatible based on their shared interest in education and local impact. The candidate's skills in project management align perfectly with the nonprofit's current needs."
  }
];

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
