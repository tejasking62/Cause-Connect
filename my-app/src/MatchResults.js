import React from 'react';
import { useNavigate } from 'react-router-dom';

// Placeholder data, replace with your actual fetched data from the database
const matchResults = {
  results: [
    {
      candidate_name: "Alex",
      nonprofit_name: "Nonprofit A",
      match_percentage: 90.0,
      details: {
        nonprofit_summary: "Nonprofit A is a mission-driven organization focused on education...",
        category: "Education",
        location: "Other",
        explanation: "Match Percentage: 90%\n\nExplanation: \n\nThe candidate and Nonprofit A are highly compatible based on their shared interest..."
      }
    },
    {
      candidate_name: "Alex",
      nonprofit_name: "Nonprofit B",
      match_percentage: 60.0,
      details: {
        nonprofit_summary: "Nonprofit B is a globally reaching organization dedicated to healthcare...",
        category: "Healthcare and mental care",
        location: "New Jersey",
        explanation: "Match Percentage: 60%\n\nExplanation: \n\nThe candidate and Nonprofit B share a common interest in Mental Health..."
      }
    },
    {
      candidate_name: "Alex",
      nonprofit_name: "Nonprofit C",
      match_percentage: 60.0,
      details: {
        nonprofit_summary: "Nonprofit C is a mission-driven organization focused on healthcare...",
        category: "Healthcare and mental care",
        location: "Other",
        explanation: "Match Percentage: 60%\n\nExplanation: \n\nThe candidate and Nonprofit C share a common interest in mental health..."
      }
    }
  ],
  best_match: {
    nonprofit_name: "Nonprofit A",
    match_percentage: 90.0
  }
};

function MatchResults() {
  const navigate = useNavigate();

  const goToMatchDetail = (result) => {
    navigate('/match-detail', { state: { result } });
  };

  return (
    <div className="match-results-container">
      <h1>Match Results for {matchResults.results[0].candidate_name}</h1>
      <h2>Best Match: {matchResults.best_match.nonprofit_name} ({matchResults.best_match.match_percentage}%)</h2>
      <ul>
        {matchResults.results.map((result, index) => (
          <li key={index} className="match-item">
            <div className="match-summary" onClick={() => goToMatchDetail(result)}>
              <h3>{result.nonprofit_name} - {result.match_percentage}%</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchResults;
