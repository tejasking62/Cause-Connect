import React, { useState } from 'react';
import './dashboard.css';

function Dashboard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

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
      label: 'Why are you interested in serving on a non-profit board?',
      type: 'select',
      options: [
        'I want to contribute my leadership skills to make a positive community impact.',
        'I am passionate about advocating for causes that align with my personal values.',
        'I enjoy networking and collaborating with others to drive meaningful change.',
        'I want to use my experience in strategy and governance to support organizational growth.',
        'I see board service as a way to develop new skills and gain leadership experience.',
        'Other (please specify)',
      ],
    },
    {
      label: 'What skills are you hoping to bring to the nonprofit you will be serving?',
      type: 'multi-select',
      options: [
        'Operations', 'Fundraising', 'Strategic planning', 'Social media', 'Project management',
        'Marketing', 'Technology', 'Human resources', 'Diversity, equity, inclusion', 'Other'
      ],
    },
    {
      label: 'Please drag and rank the following skills based on your strength in each area (from strongest to weakest)',
      type: 'ranking',
      options: [
        'Advocating for a cause',
        'Having tough conversations',
        'Strategic planning',
        'Reviewing a budget and/or profit and loss statement',
        'Fundraising',
      ],
    },
    {
      label: 'Have you served in any sort of leadership for 6 months or more?',
      type: 'select',
      options: ['Yes', 'No'],
    },
    {
      label: 'Share your experience with board service',
      type: 'select',
      options: [
        'I’ve never been on a board',
        'I have previously held a position on a board of directors',
        'I’m currently on a board and looking to join another',
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
      label: 'Logistical Information',
      type: 'logistics',
      fields: [
        { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        { label: 'Organization/employer', type: 'text', placeholder: 'Enter your organization' },
        { label: 'Occupation/role', type: 'text', placeholder: 'Enter your role' },
        {
          label: 'Age', type: 'select', options: [
            '18-24', '25-34', '35-49', '50-64', '65+'
          ]
        },
        {
          label: 'How do you identify yourself?', type: 'select', options: [
            'Woman', 'Man', 'Transgender', 'Non-binary/non-conforming', 'Prefer not to respond'
          ]
        },
        {
          label: 'Race/ethnicity', type: 'select', options: [
            'American Indian or Alaska Native', 'Asian', 'Black or African American',
            'Native Hawaiian or other Pacific Islander', 'White', 'Two or more races', 'Other'
          ]
        },
        {
          label: 'Where are you located?', type: 'select', options: [
            'New Castle county', 'Kent county', 'Sussex county', 'Maryland', 'New Jersey', 'Pennsylvania', 'Other'
          ]
        },
        {
          label: 'What days are you available?', type: 'multi-select', options: ['M-F']
        },
        {
          label: 'What time are you available?', type: 'multi-select', options: ['10am-1pm', '1pm-4pm', '4pm-7pm']
        },
      ]
    }
  ];

  const handleInputChange = (e, index) => {
    setAnswers({
      ...answers,
      [index]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderQuestion = (question, index) => {
    if (question.type === 'text') {
      return (
        <input
          type="text"
          placeholder={question.placeholder}
          value={answers[index] || ''}
          onChange={(e) => handleInputChange(e, index)}
          className="input-text"
        />
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
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
      );
    } else if (question.type === 'multi-select') {
      return (
        <div className="multi-select">
          {question.options.map((option, i) => (
            <div key={i}>
              <input
                type="checkbox"
                id={option}
                value={option}
                checked={answers[index]?.includes(option) || false}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      );
    }
    // Add handling for 'ranking' and 'logistics' if needed
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
