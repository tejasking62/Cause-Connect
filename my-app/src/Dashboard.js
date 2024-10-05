import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './dashboard.css'; // Import the CSS file

function Dashboard() {
  const location = useLocation();
  const role = location.state?.role || 'default'; // Retrieve the user's role from state

  return (
    <div className="dashboard-container">
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
      label: 'Would you prefer a field-based position working directly with beneficiaries, or would you rather be involved in behind-the-scenes work like program development, research, or administration?',
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
      label: 'Would you prefer a field-based position working directly with beneficiaries, or would you rather be involved in behind-the-scenes work like program development, research, or administration?',
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

const Questionnaire = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleInputChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: e.target.value,
    });
  };

  const handleMultiSelectChange = (e, option) => {
    const currentAnswers = answers[currentQuestionIndex] || [];
    const selected = e.target.checked;

    if (selected && currentAnswers.length < 3) {
      setAnswers({
        ...answers,
        [currentQuestionIndex]: [...currentAnswers, option],
      });
    } else if (!selected) {
      setAnswers({
        ...answers,
        [currentQuestionIndex]: currentAnswers.filter(item => item !== option),
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Form submitted with answers:', answers);
  
      // Redirect to submission success page
      window.location.href = '/submission';
    }
  };

  const renderMultiSelect = (options) => {
    const currentAnswers = answers[currentQuestionIndex] || [];

    return (
      <div>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={option}
              name={option}
              value={option}
              checked={currentAnswers.includes(option)}
              onChange={(e) => handleMultiSelectChange(e, option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
        {currentAnswers.length >= 3 && (
          <p style={{ color: 'red' }}>You can only select up to 3 options.</p>
        )}
      </div>
    );
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
          renderMultiSelect(questions[currentQuestionIndex].options)
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
