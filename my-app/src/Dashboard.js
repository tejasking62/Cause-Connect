import React, { useState } from 'react';
import './dashboard.css';


function Dashboard() {
  const location = useLocation();
  const role = location.state?.role || 'default'; 

  return (
    <div>
      <h1>{role === 'nonprofit' ? 'Non-Profit Dashboard' : 'Leader Dashboard'}</h1>
      {role === 'nonprofit' ? <NonProfitForm /> : <LeaderForm />}
    </div>
  );
}

  // Define all questions, including the 9th question
  const questions = [
    {
      label: 'Which causes or social issues are you most passionate about supporting? (select up to 3)',
      type: 'multi-select',
      options: [
        'Education and youth development',
        'Healthcare and mental health',
        'Environmental sustainability',
        'Social justice and equity',
        'Poverty alleviation and housing',
        'Arts and culture',
        'Open to supporting a variety of causes',
        'Other (please specify)',
      ],
    },
    {
      label: 'What size of non-profit are you most interested in serving on?',
      type: 'select',
      options: [
        'Small, local impact',
        'Mid-sized, regional or national impact',
        'Large, global reach',
        'Open to any size as long as the mission aligns',
      ],
    },
    {
      label: 'What skills are you hoping to bring to the nonprofit you will be serving?',
      type: 'multi-select',
      options: [
        'Operations',
        'Fundraising',
        'Strategic planning',
        'Social media',
        'Project management',
        'Marketing',
        'Technology',
        'Human resources',
        'Diversity, equity, inclusion',
        'Other',
      ],
    },
    {
      label: 'Have you served in any sort of leadership for 6 months or more?',
      type: 'select',
      options: ['Yes', 'No'],
    },
    {
      label: 'What is your current occupation or role?',
      type: 'text',
      placeholder: 'Enter your current role',
    },
    {
      label: 'What days are you available to volunteer?',
      type: 'multi-select',
      options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    {
      label: 'What time of day are you available to volunteer?',
      type: 'select',
      options: ['Morning', 'Afternoon', 'Evening'],
    },
    {
      label: 'What is your preferred method of communication?',
      type: 'select',
      options: ['Email', 'Phone', 'Text', 'In-person'],
    },
    {
      label: 'Would you be interested in leading a team of volunteers?',
      type: 'select',
      options: ['Yes', 'No', 'Maybe'],
    },
  ];

  // Handle input changes for both single-select and multi-select questions
  const handleInputChange = (e, index, multiSelect = false) => {
    const { name, value, checked } = e.target;

    if (multiSelect) {
      // Handle multiple selections for checkboxes
      setAnswers((prev) => {
        const selected = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...selected, value] };
        } else {
          return { ...prev, [name]: selected.filter((item) => item !== value) };
        }
      });
    } else {
      // Handle single selections
      setAnswers({
        ...answers,
        [index]: value,
      });
    }
  };

  // Handle advancing to the next step or form submission
  const handleNextStep = () => {
    if (currentStep === questions.length - 1) {
      // If it's the last question, handle form submission here
      console.log('Form submitted:', answers); // Simulate form submission (without a popup)
      // Implement actual form submission logic here (e.g., API call)
    } else {
      setCurrentStep(currentStep + 1); // Go to next question
    }
  };

  // Render each question based on its type (multi-select, select, or text input)
  const renderQuestion = (question, index) => {
    if (question.type === 'multi-select') {
      return (
        <div className="multi-select">
          {question.options.map((option, i) => (
            <div key={i}>
              <input
                type="checkbox"
                id={`option-${index}-${i}`}
                name={`multi-${index}`}
                value={option}
                checked={answers[`multi-${index}`]?.includes(option) || false}
                onChange={(e) => handleInputChange(e, index, true)}
              />
              <label htmlFor={`option-${index}-${i}`}>{option}</label>
            </div>
          ))}
        </div>
      );
    } else if (question.type === 'select') {
      return (
        <select
          value={answers[index] || ''}
          onChange={(e) => handleInputChange(e, index)}
          className="input-select"
        >
          <option value="">Select an option</option>
          {question.options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (question.type === 'text') {
      return (
        <input
          type="text"
          placeholder={question.placeholder || ''}
          value={answers[index] || ''}
          onChange={(e) => handleInputChange(e, index)}
          className="input-text"
        />
      );
    }
  };

  return (
    <div className="container">
      <div className="navigation-bar">
        <a href="#" className="login-button">Login</a>
      </div>
      <div className="step">
        <h2>{questions[currentStep].label}</h2>
        {renderQuestion(questions[currentStep], currentStep)}
        <button onClick={handleNextStep} className="next-button">
          {currentStep < questions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
