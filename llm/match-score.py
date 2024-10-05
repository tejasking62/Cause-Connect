import openai
from sentence_transformers import SentenceTransformer, util
import json
import os

# Set your OpenAI API key
openai.api_key = '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'
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load candidate data from the JSON file
candidates_file_path = r'C:\Users\pavan\Team-4\llm\leaders.json'  # Path to the JSON file

if os.path.exists(candidates_file_path):
    with open(candidates_file_path, 'r') as file:
        candidates = json.load(file)
else:
    raise FileNotFoundError(f"{candidates_file_path} not found.")

# List of nonprofit organizations
nonprofit_list = [
    {
        "#": "boxnnaoy48qg29omnmboxinvofym0cfc",
        "What is your nonprofit’s name?": "Nonprofit C",
        "Where is your nonprofit located?": "Other",
        "Under what category does your nonprofit fit best?": "Healthcare and mental care",
        "What skills are you looking to recruit for?": "Social media",
        "What size would you consider your nonprofit?": "Medium (regional or national impact)",
        "Are you willing to take someone in without prior board service?": 0,
        "What kind of experience does your nonprofit board offer?": "Community Outreach",
        "What are the most important skills to you?": "Advocating for a cause,Strategic planning,Fundraising,Having tough conversations,Reviewing a budget and/or profit and loss statement",
        "Do you want a candidate in a preferred age range?": "35-49",
        "What days would you want a candidate to be available?": "Wednesday",
        "What times would you want a candidate to be available?": "1pm-4pm",
        "Response Type": "completed"
    },
    {
        "#": "odwdp4nzj1xg6m9l36odwdp4nzlv2gcw",
        "What is your nonprofit’s name?": "Nonprofit B",
        "Where is your nonprofit located?": "New Jersey",
        "Under what category does your nonprofit fit best?": "Healthcare and mental care",
        "What skills are you looking to recruit for?": "Project management",
        "What size would you consider your nonprofit?": "Large (global reach)",
        "Are you willing to take someone in without prior board service?": 0,
        "What kind of experience does your nonprofit board offer?": "Strategy and/or Governance",
        "What are the most important skills to you?": "Advocating for a cause,Strategic planning,Having tough conversations,Reviewing a budget and/or profit and loss statement,Fundraising",
        "Do you want a candidate in a preferred age range?": "35-49",
        "What days would you want a candidate to be available?": "Wednesday",
        "What times would you want a candidate to be available?": "10am-1pm",
        "Response Type": "completed"
    }
]

# Function to generate a descriptive paragraph using GPT
def generate_paragraph(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.5
    )
    return response.choices[0].message['content'].strip()

# Function to format the candidate's causes and skills
def format_nested_data(nested_dict):
    if isinstance(nested_dict, dict):  # Ensure it's a dictionary
        return ", ".join([key for key, value in nested_dict.items() if value])
    return nested_dict  # If it's not a dict, return as is

# Define a function to call the OpenAI API
def match_candidate_to_nonprofits(candidate, nonprofits):
    # Extract candidate details
    candidate_name = candidate.get('name', 'Unknown')  # Safeguard against missing keys
    candidate_skills = format_nested_data(candidate.get('Skills candidate is hoping to bring to the nonprofit', {}))
    candidate_interests = format_nested_data(candidate.get('Causes or social issues candidate is most passionate about supporting', {}))
    candidate_availability = candidate.get('Dates candidate is available', {})
    candidate_time_slots = candidate.get('Times candidate is available', {})
    candidate_location = candidate.get('Where are you located?', 'Unknown')

    # Create the prompt
    prompt = f"""
    You are an assistant that matches candidates to nonprofit organizations.
    
    Here is the candidate data:
    Name: {candidate_name}
    Skills: {candidate_skills}
    Causes of interest: {candidate_interests}
    Availability: {candidate_availability}
    Time Slots: {candidate_time_slots}
    Location: {candidate_location}
    
    Here are the nonprofit organizations:
    """

    for nonprofit in nonprofits:
        prompt += f"""
        Nonprofit Name: {nonprofit['What is your nonprofit’s name?']}
        Focus Areas: {nonprofit['Under what category does your nonprofit fit best?']}
        Skills Needed: {nonprofit['What skills are you looking to recruit for?']}
        Location: {nonprofit['Where is your nonprofit located?']}
        Time Slots: {nonprofit['What times would you want a candidate to be available?']}
        """

    prompt += """
    Based on the candidate's skills, interests, availability, and location, suggest the best matching nonprofit(s) for the candidate and explain why.
    """

    # Call OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an assistant that matches candidates to nonprofit organizations."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,
        temperature=0.5
    )

    # Extract and return the response
    return response.choices[0].message['content'].strip()

# Function to create a candidate paragraph
def create_candidate_paragraph(candidate):
    prompt = f"""
    Generate a concise candidate summary based on the following information:
    The candidate is passionate about {format_nested_data(candidate.get('Causes or social issues candidate is most passionate about supporting', {}))}, with a strong commitment to these causes. 
    They bring skills in {format_nested_data(candidate.get('Skills candidate is hoping to bring to the nonprofit', {}))}, which align well with their nonprofit interests. 
    They prefer working with small, local impact organizations and are available on {', '.join([day for day in candidate.get('Dates candidate is available', {}) if candidate['Dates candidate is available'][day]])}. 
    Create a summary that highlights their passions, skills, and availability in a professional tone.
    """
    return generate_paragraph(prompt)

# Function to create a nonprofit paragraph
def create_nonprofit_paragraph(nonprofit):
    prompt = f"""
    Generate a concise nonprofit summary based on the following information:
    The nonprofit {nonprofit['What is your nonprofit’s name?']} is dedicated to {nonprofit['Under what category does your nonprofit fit best?']}.
    They are looking for individuals with skills in {nonprofit['What skills are you looking to recruit for?']} to enhance their impact.
    This nonprofit values contributions in {nonprofit['What kind of experience does your nonprofit board offer?']}, and prefers candidates available on {nonprofit['What days would you want a candidate to be available?']}.
    """
    return generate_paragraph(prompt)

# Store results
results = []

# Process only the candidate with the name 's'
for candidate in candidates:
    if candidate.get('name') == 'we':  # Process candidate with name 's'
        candidate_paragraph = create_candidate_paragraph(candidate)

        for nonprofit in nonprofit_list:
            nonprofit_paragraph = create_nonprofit_paragraph(nonprofit)
            similarity_score = match_candidate_to_nonprofits(candidate, nonprofit_list)

            results.append({
                "candidate_name": candidate['name'],
                "nonprofit_name": nonprofit['What is your nonprofit’s name?'],
                "nonprofit_summary": nonprofit_paragraph,
                "category": nonprofit['Under what category does your nonprofit fit best?'],
                "location": nonprofit['Where is your nonprofit located?'],
                "match_summary": similarity_score
            })

# Convert results to JSON
results_json = json.dumps(results, indent=4)

# Print the JSON results
print("Results JSON:\n", results_json)

# Find the nonprofit with the highest match score for the candidate 's'
if results:
    best_match = max(results, key=lambda x: float(x['match_summary'].split('%')[0].split(':')[-1].strip()))
    print(f"Best match for {best_match['candidate_name']}: {best_match['nonprofit_name']} with match explanation: {best_match['match_summary']}")
