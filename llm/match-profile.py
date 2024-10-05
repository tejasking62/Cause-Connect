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
    "What is your nonprofit\u2019s name?": "Nonprofit C",
    "revenue": "0-1million",
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
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 02:39:31",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 02:41:38",
    "Network ID": "653e97acae",
    "Image": "nonprofit_image.png"
  },
  {
    "#": "odwdp4nzj1xg6m9l36odwdp4nzlv2gcw",
    "What is your nonprofit\u2019s name?": "Nonprofit B",
    "revenue": "1-10million",
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
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 02:34:45",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 02:38:36",
    "Network ID": "653e97acae",
    "Image": "nonprofit_image.png"
  },
  {
    "#": "g90zltrzyndkmhsdg90o43h2a5876n7p",
    "What is your nonprofit\u2019s name?": "Nonprofit A",
    "revenue": "1-10million",
    "Where is your nonprofit located?": "Other",
    "Under what category does your nonprofit fit best?": "Education",
    "What skills are you looking to recruit for?": "Project management",
    "What size would you consider your nonprofit?": "Small (local impact)",
    "Are you willing to take someone in without prior board service?": 1,
    "What kind of experience does your nonprofit board offer?": "Community Outreach",
    "What are the most important skills to you?": "Advocating for a cause,Fundraising,Strategic planning,Reviewing a budget and/or profit and loss statement,Having tough conversations",
    "Do you want a candidate in a preferred age range?": "25-34",
    "What days would you want a candidate to be available?": "Monday",
    "What times would you want a candidate to be available?": "1pm-4pm",
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 02:01:28",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 02:30:18",
    "Network ID": "653e97acae",
    "Image": "nonprofit_image.png"
  },
  {
    "#": "d9fh6npx92k6c8hf1lwoi7vtnab2gk6r",
    "What is your nonprofit’s name?": "Nonprofit D",
    "revenue": "0-1million",
    "Where is your nonprofit located?": "California",
    "Under what category does your nonprofit fit best?": "Art and cultures",
    "What skills are you looking to recruit for?": "Marketing",
    "What size would you consider your nonprofit?": "Small (local impact)",
    "Are you willing to take someone in without prior board service?": 1,
    "What kind of experience does your nonprofit board offer?": "Creative and Arts Programming",
    "What are the most important skills to you?": "Marketing, Strategic planning, Social media",
    "Do you want a candidate in a preferred age range?": "25-34",
    "What days would you want a candidate to be available?": "Thursday",
    "What times would you want a candidate to be available?": "4pm-7pm",
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 03:00:00",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 03:02:00",
    "Network ID": "653e97acae",
    "Image": "nonprofit_image.png"
  },
  {
    "#": "f0wpnlf82bx3qzvf7xj2gd9yn6r7vq84",
    "What is your nonprofit’s name?": "Nonprofit E",
    "revenue": "10-50million",
    "Where is your nonprofit located?": "New York",
    "Under what category does your nonprofit fit best?": "Social justice and equity",
    "What skills are you looking to recruit for?": "Diversity, equity, and inclusion",
    "What size would you consider your nonprofit?": "Large (global reach)",
    "Are you willing to take someone in without prior board service?": 0,
    "What kind of experience does your nonprofit board offer?": "Advocacy and Social Justice",
    "What are the most important skills to you?": "Fundraising, Strategic planning, Diversity, equity, and inclusion",
    "Do you want a candidate in a preferred age range?": "50-64",
    "What days would you want a candidate to be available?": "Monday",
    "What times would you want a candidate to be available?": "10am-1pm",
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 03:15:00",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 03:20:00",
    "Network ID": "653e97acae",
    "Image": "nonprofit_image.png"
  },
  {
    "#": "t98kmz8x5c9bf3wj46k28ovwtqpnsh2j",
    "What is your nonprofit’s name?": "Nonprofit F",
    "revenue": "0-1million",
    "Where is your nonprofit located?": "Florida",
    "Under what category does your nonprofit fit best?": "Poverty alleviation and housing",
    "What skills are you looking to recruit for?": "Human resources",
    "What size would you consider your nonprofit?": "Medium (regional or national impact)",
    "Are you willing to take someone in without prior board service?": 1,
    "What kind of experience does your nonprofit board offer?": "Housing and Development",
    "What are the most important skills to you?": "Human resources, Fundraising, Operations",
    "Do you want a candidate in a preferred age range?": "25-34",
    "What days would you want a candidate to be available?": "Tuesday",
    "What times would you want a candidate to be available?": "1pm-4pm",
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 03:30:00",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 03:35:00",
    "Network ID": "653e97acae",
    "Image": "nonprofit_image.png"
  }]

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

    # Create the prompt with an explicit request for match percentage
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
    Based on the candidate's skills, interests, availability, and location, suggest the best matching nonprofit(s) for the candidate.
    Provide a match percentage out of 100 and a brief explanation of why the nonprofit matches the candidate.
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

# Process only the candidate with the name 'aa'
for candidate in candidates:
    if candidate.get('name') == 'aa':  # Process candidate with name 'aa'
        candidate_paragraph = create_candidate_paragraph(candidate)

        for nonprofit in nonprofit_list:
            nonprofit_paragraph = create_nonprofit_paragraph(nonprofit)
            match_response = match_candidate_to_nonprofits(candidate, nonprofit_list)

            # Extract the match percentage and explanation from match_response
            try:
                match_percentage = float(match_response.split("Match Percentage:")[1].split('%')[0].strip())
            except (IndexError, ValueError):
                match_percentage = 0  # Fallback if the extraction fails

            results.append({
                "candidate_name": candidate['name'],
                "nonprofit_name": nonprofit['What is your nonprofit’s name?'],
                "nonprofit_summary": nonprofit_paragraph,
                "category": nonprofit['Under what category does your nonprofit fit best?'],
                "location": nonprofit['Where is your nonprofit located?'],
                "match_percentage": match_percentage,
                "match_summary": match_response
            })

# Convert results to JSON
results_json = json.dumps(results, indent=4)

# Print the JSON results
print("Results JSON:\n", results_json)

# Find the nonprofit with the highest match score for the candidate 'aa'
if results:
    best_match = max(results, key=lambda x: x['match_percentage'])
    print(f"Best match for {best_match['candidate_name']}: {best_match['nonprofit_name']} with {best_match['match_percentage']}% match.")
