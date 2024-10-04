// src/LeadersQuestionDisplay.js
import React, { useState } from 'react';

const leaderQuestions = [
  "What inspired you to become a leader in the nonprofit sector?",
  "What qualities do you believe are essential for effective leadership?",
  "How do you handle conflicts within your organization?",
  "Can you share a success story from your leadership journey?"
];

function LeadersQuestionDisplay() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < leaderQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Leaders Questions</h1>
      <div className="question-container">
        <h2 style={{ fontSize: '2rem' }}>{leaderQuestions[currentQuestionIndex]}</h2>
      </div>
      <div className="mt-4">
        <button onClick={handlePrevious} className="btn btn-secondary" disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-primary" disabled={currentQuestionIndex === leaderQuestions.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default LeadersQuestionDisplay;
