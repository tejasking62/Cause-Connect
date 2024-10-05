import React, { useState } from 'react';

// Sample Results JSON data
const resultsJSON = [
    {
        candidate_name: "Alex",
        nonprofit_name: "Nonprofit C",
        nonprofit_summary: "Nonprofit C is a mission-driven organization focused on healthcare and mental care. They are currently seeking individuals skilled in social media to boost their impact. The organization highly values contributions in community outreach and prefers candidates who are available on Wednesdays. Nonprofit C operates on a medium scale with regional or national impact and is open to individuals without prior board service.",
        category: "Healthcare and mental care",
        location: "Other",
        match_percentage: 60.0,
        explanation: "Match Percentage: 60%\n\nExplanation: \n\nThe candidate and Nonprofit C share a common interest in mental health, which is a strong basis for their compatibility. The candidate's skills in marketing and technology could potentially be applied to the social media skills that Nonprofit C is seeking, although the candidate's profile does not specifically mention social media expertise."
    },
    {
        candidate_name: "Alex",
        nonprofit_name: "Nonprofit B",
        nonprofit_summary: "Nonprofit B is a globally reaching organization dedicated to healthcare and mental care. They are currently looking for individuals skilled in Project Management to amplify their impact. They value contributions in Strategy and Governance and prefer candidates who are available on Wednesdays. The organization is open to accepting individuals without prior board service.",
        category: "Healthcare and mental care",
        location: "New Jersey",
        match_percentage: 60.0,
        explanation: "Match Percentage: 60%\n\nExplanation: \n\nThe candidate and Nonprofit B share a common interest in Mental Health, which is a good starting point for compatibility. The candidate's skills in Project Management also align with what the nonprofit is currently seeking."
    },
    {
        candidate_name: "Alex",
        nonprofit_name: "Nonprofit A",
        nonprofit_summary: "Nonprofit A is a mission-driven organization focused on education. They are currently seeking individuals skilled in project management to help enhance their local impact. The organization highly values contributions in community outreach and prefers candidates who are available on Mondays.",
        category: "Education",
        location: "Other",
        match_percentage: 90.0,
        explanation: "Match Percentage: 90%\n\nExplanation: \n\nThe candidate and Nonprofit A are highly compatible based on their shared interest in education and local impact. The candidate's skills in project management align perfectly with the nonprofit's current needs."
    }
];

const Results = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExplanation = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Find the best match
    const bestMatch = resultsJSON.reduce((prev, current) => {
        return (prev.match_percentage > current.match_percentage) ? prev : current;
    }, resultsJSON[0]);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
            <h1>Results for {bestMatch.candidate_name}</h1>

            <div style={{ fontWeight: 'bold', color: 'green', marginBottom: '20px' }}>
                Best match for {bestMatch.candidate_name}: {bestMatch.nonprofit_name} with {bestMatch.match_percentage}% match.
            </div>

            {resultsJSON.map((result, index) => (
                <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px', marginBottom: '20px' }}>
                    <h3>{result.nonprofit_name} ({result.match_percentage}%)</h3>
                    <p>{result.nonprofit_summary}</p>

                    <span 
                        style={{ cursor: 'pointer', color: '#007bff' }} 
                        onClick={() => toggleExplanation(index)}
                    >
                        {expandedIndex === index ? 'Hide Explanation' : 'Show Explanation'}
                    </span>

                    {expandedIndex === index && (
                        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '5px' }}>
                            {result.explanation}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Results;
