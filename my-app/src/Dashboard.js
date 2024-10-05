import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const { role } = location.state; // Retrieve the user's role from state

  return (
    <div>
      <h1>{role === 'nonprofit' ? 'Non-Profit Dashboard' : 'Leader Dashboard'}</h1>
      {role === 'nonprofit' ? <NonProfitForm /> : <LeaderForm />}
    </div>
  );
}

// Non-Profit Form with matching questions
const NonProfitForm = () => {
  const questions = [
    { label: 'What causes/social issues are you most passionate about?', type: 'text' },
    { label: 'What motivates you to work in the nonprofit sector?', type: 'text' },
    {
      label: 'What are your strongest professional skills that you can apply to a nonprofit role?',
      type: 'multi-select',
      options: ['Fundraising', 'Program Development', 'Marketing', 'Research', 'Advocacy'],
    },
    {
      label: 'Would you prefer a field-based position working directly with beneficiaries, or would you rather be involved in the behind-the-scenes work like program development, research, or administration?',
      type: 'select',
      options: ['Field-based', 'Behind-the-scenes'],
    },
    {
      label: 'Do you prefer working for small, community-based nonprofits or larger, national/global organizations?',
      type: 'select',
      options: ['Small, community-based', 'Larger, national/global'],
    },
  ];

  return <Questionnaire questions={questions} />;
};

// Leader Form with matching questions
const LeaderForm = () => {
  const questions = [
    { label: 'What causes/social issues are you most passionate about?', type: 'text' },
    { label: 'What motivates you to work in the nonprofit sector?', type: 'text' },
    {
      label: 'What are your strongest professional skills that you can apply to a nonprofit role?',
      type: 'multi-select',
      options: ['Fundraising', 'Program Development', 'Marketing', 'Research', 'Advocacy'],
    },
    {
      label: 'Would you prefer a field-based position working directly with beneficiaries, or would you rather be involved in the behind-the-scenes work like program development, research, or administration?',
      type: 'select',
      options: ['Field-based', 'Behind-the-scenes'],
    },
    {
      label: 'Do you prefer working for small, community-based nonprofits or larger, national/global organizations?',
      type: 'select',
      options: ['Small, community-based', 'Larger, national/global'],
    },
  ];

  return <Questionnaire questions={questions} />;
};

// Questionnaire component to handle one-at-a-time questions with multi-select support
const Questionnaire = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleInputChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    if (selectedOptions.length <= 3) {
      setAnswers({
        ...answers,
        [currentQuestionIndex]: selectedOptions,
      });
    } else {
      alert("You can only select up to 3 options.");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle form submission logic here, e.g., send answers to API
      console.log('Form submitted with answers:', answers);
      alert('Thank you for your submission!');
    }
  };

  return (
    <form onSubmit={handleNext}>
      <div>
        <label>{questions[currentQuestionIndex].label}</label>
        {questions[currentQuestionIndex].type === 'text' ? (
          <input
            type="text"
            value={answers[currentQuestionIndex] || ''}
            onChange={handleInputChange}
            required
          />
        ) : questions[currentQuestionIndex].type === 'multi-select' ? (
          <select
            multiple
            value={answers[currentQuestionIndex] || []}
            onChange={handleMultiSelectChange}
            required
          >
            {questions[currentQuestionIndex].options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <select
            value={answers[currentQuestionIndex] || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
      <button type="submit">
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
      </button>
    </form>
  );
};

export default Dashboard;
