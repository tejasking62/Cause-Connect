import React from 'react';
import { useLocation } from 'react-router-dom';

function MatchDetail() {
  const location = useLocation();
  const { result } = location.state; 

  return (
    <div className="match-detail-container">
      <h1>{result.nonprofit_name}</h1>
      <h2>Match Percentage: {result.match_percentage}%</h2>
      <h3>Summary:</h3>
      <p>{result.details.nonprofit_summary}</p>
      <h3>Category:</h3>
      <p>{result.details.category}</p>
      <h3>Location:</h3>
      <p>{result.details.location}</p>
      <h3>Explanation:</h3>
      <pre>{result.details.explanation}</pre>
    </div>
  );
}

export default MatchDetail;
