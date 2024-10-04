// src/NonprofitsQuestionDisplay.js
import React, { useState } from 'react';

const nonprofitQuestions = [
  "What motivated you to start or join a nonprofit organization?",
  "How do you engage your community in your nonprofit's mission?",
  "What strategies do you use to fundraise effectively?",
  "Can you describe a challenge your nonprofit has faced and how you overcame it?"
];

function NonprofitsQuestionDisplay() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < nonprofitQuestions.length - 1) {
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
      <h1>Nonprofits Questions</h1>
      <div className="question-container">
        <h2 style={{ fontSize: '2rem' }}>{nonprofitQuestions[currentQuestionIndex]}</h2>
      </div>
      <div className="mt-4">
        <button onClick={handlePrevious} className="btn btn-secondary" disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-primary" disabled={currentQuestionIndex === nonprofitQuestions.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default NonprofitsQuestionDisplay;
