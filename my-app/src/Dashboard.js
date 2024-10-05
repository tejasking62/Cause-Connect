import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const { role } = location.state; 

  return (
    <div>
      <h1>{role === 'nonprofit' ? 'Non-Profit Dashboard' : 'Leader Dashboard'}</h1>
      {role === 'nonprofit' ? <NonProfitForm /> : <LeaderForm />}
    </div>
  );
}


const NonProfitForm = () => {
  const questions = [
    { label: 'What motivates you to work in the non-profit sector?', type: 'text' },
    { label: 'Describe any volunteer experiences you have had.', type: 'text' },
    { label: 'What skills do you possess that can benefit a non-profit organization?', type: 'text' },
    { label: 'How do you measure the success of a non-profit initiative?', type: 'text' },
    { label: 'What challenges do you think non-profits face today?', type: 'text' },
  ];

  return <Questionnaire questions={questions} />;
};

// Leader Form with general questions
const LeaderForm = () => {
  const questions = [
    { label: 'What causes/social issues are you most passionate about?', type: 'text' },
    { label: 'What motivates you to work in the nonprofit sector?', type: 'text' },
    { label: 'Do you prefer working for small, community-based nonprofits or larger, national/global organizations?', type: 'text' },
    { label: 'Are you comfortable working in a leadership or team management role, or do you prefer individual contributor positions?', type: 'text' },
    { label: 'Do you prefer roles that are more operational or those that are client-facing (e.g., administrative work versus direct service with communities)?', type: 'text' },
  ];

  return <Questionnaire questions={questions} />;
};

// Questionnaire component to handle one-at-a-time questions
const Questionnaire = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleInputChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Form submitted with answers:', answers);
      alert('Thank you for your submission!');
    }
  };

  return (
    <form onSubmit={handleNext}>
      <div>
        <label>{questions[currentQuestionIndex].label}</label>
        <input
          type={questions[currentQuestionIndex].type}
          value={answers[currentQuestionIndex] || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </form>
  );
};

export default Dashboard;
