import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Use to get the user's info from login

function Dashboard() {
  const location = useLocation();
  const { email } = location.state || {}; // Extract email from login state

  // Define the state for form data
  const [formData, setFormData] = useState({
    "Causes or social issues candidate is most passionate about supporting": {
      "Education and youth development": false,
      "Healthcare and mental health": false,
      "Environmental sustainability": false,
      "Social justice and equity": false,
      "Poverty alleviation and housing": false,
      "Arts and culture": false
    },
    "Skills candidate is hoping to bring to the nonprofit": {
      "Social media": false,
      "Project management": false,
      "Marketing": false,
      "Technology": false,
      "Human resources": false,
      "Diversity, equity, inclusion": false,
      "Other": false
    },
    "Why are you interested in serving on a non-profit board?": '',
    "Have you served in any leadership role for 6 months or more?": '',
    "Share your experience with board service": '',
    "What size of non-profit are you most interested in?": '',
    "Who is your employer": '',
    "What is your role/occupation": '',
    "Age": '',
    "Choose how you identify yourself": '',
    "Race/ethnicity": '',
    "Dates candidate is available": {
      "Monday": false,
      "Tuesday": false,
      "Wednesday": false,
      "Thursday": false,
      "Friday": false
    },
    "Times candidate is available": {
      "10am-1pm": false,
      "1pm-4pm": false,
      "4pm-7pm": false
    },
    "Where are you located?": '',
  });

  const navigate = useNavigate();

  // Handle input changes (checkboxes and text)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split('.'); // For checkbox sections

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug: Log formData before submitting
    console.log("Submitting form with data:", formData);

    try {
      const response = await fetch('http://localhost:5000/api/leader-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, formData }),
      });

      // Debug: Check raw response
      console.log("Raw response:", response);

      if (!response.ok) {
        throw new Error('Failed to submit the form.');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      // Navigate to the results page and pass the result data
      navigate('/results', { state: { matchResults: result } });
    } catch (error) {
      // Debug: Log error
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Fill out the following information:</h1>

      {/* Causes section */}
      <h2>Causes or social issues you are passionate about</h2>
      {Object.keys(formData["Causes or social issues candidate is most passionate about supporting"]).map((cause) => (
        <div key={cause}>
          <input
            type="checkbox"
            name={`Causes or social issues candidate is most passionate about supporting.${cause}`}
            checked={formData["Causes or social issues candidate is most passionate about supporting"][cause]}
            onChange={handleInputChange}
          />
          <label>{cause}</label>
        </div>
      ))}

      {/* Skills section */}
      <h2>Skills you want to bring to the nonprofit</h2>
      {Object.keys(formData["Skills candidate is hoping to bring to the nonprofit"]).map((skill) => (
        <div key={skill}>
          <input
            type="checkbox"
            name={`Skills candidate is hoping to bring to the nonprofit.${skill}`}
            checked={formData["Skills candidate is hoping to bring to the nonprofit"][skill]}
            onChange={handleInputChange}
          />
          <label>{skill}</label>
        </div>
      ))}

      {/* Text fields */}
      <div>
        <label>Why are you interested in serving on a non-profit board?</label>
        <textarea
          name="Why are you interested in serving on a non-profit board?"
          value={formData["Why are you interested in serving on a non-profit board?"]}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Have you served in any leadership role for 6 months or more?</label>
        <input
          type="text"
          name="Have you served in any leadership role for 6 months or more?"
          value={formData["Have you served in any leadership role for 6 months or more?"]}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Share your experience with board service</label>
        <textarea
          name="Share your experience with board service"
          value={formData["Share your experience with board service"]}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>What size of non-profit are you most interested in?</label>
        <input
          type="text"
          name="What size of non-profit are you most interested in?"
          value={formData["What size of non-profit are you most interested in?"]}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Who is your employer?</label>
        <input
          type="text"
          name="Who is your employer"
          value={formData["Who is your employer"]}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>What is your role/occupation?</label>
        <input
          type="text"
          name="What is your role/occupation"
          value={formData["What is your role/occupation"]}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Age</label>
        <input
          type="text"
          name="Age"
          value={formData["Age"]}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Choose how you identify yourself</label>
        <input
          type="text"
          name="Choose how you identify yourself"
          value={formData["Choose how you identify yourself"]}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Race/ethnicity</label>
        <input
          type="text"
          name="Race/ethnicity"
          value={formData["Race/ethnicity"]}
          onChange={handleInputChange}
        />
      </div>

      {/* Dates candidate is available */}
      <h2>Dates you are available</h2>
      {Object.keys(formData["Dates candidate is available"]).map((day) => (
        <div key={day}>
          <input
            type="checkbox"
            name={`Dates candidate is available.${day}`}
            checked={formData["Dates candidate is available"][day]}
            onChange={handleInputChange}
          />
          <label>{day}</label>
        </div>
      ))}

      {/* Times candidate is available */}
      <h2>Times you are available</h2>
      {Object.keys(formData["Times candidate is available"]).map((time) => (
        <div key={time}>
          <input
            type="checkbox"
            name={`Times candidate is available.${time}`}
            checked={formData["Times candidate is available"][time]}
            onChange={handleInputChange}
          />
          <label>{time}</label>
        </div>
      ))}

      <div>
        <label>Where are you located?</label>
        <input
          type="text"
          name="Where are you located?"
          value={formData["Where are you located?"]}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Dashboard;
