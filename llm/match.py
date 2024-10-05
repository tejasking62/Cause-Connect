from openai import OpenAI

client = OpenAI(api_key=(''))


# Set your OpenAI API key

# Candidate data with the new structure
candidates = [
    {
    "ID": 1,
    "Enter your name": "Alex",
    "Enter your email": "alex123@domain.com",
    "Causes or social issues candidate is most passionate about supporting": {
      "Education and youth development": "Education and youth development",
      "Healthcare and mental health": "Mental health",
      "Environmental sustainability": "Environmental sustainability",
      "Social justice and equity": "Social justice",
      "Poverty alleviation and housing": None,
      "Arts and culture": None
    },
    "Skills candidate is hoping to bring to the nonprofit": {
      "Social media": None,
      "Project management": "Project management",
      "Marketing": "Marketing",
      "Technology": "Technology",
      "Human resources": None,
      "Diversity, equity, inclusion": "Diversity, equity, inclusion",
      "Other": None
    },
    "Why are you interested in serving on a non-profit board?": "I want to contribute my skills to make a tangible difference.",
    "Have you served in any sort of leadership for 6 months or more?": "No",
    "Share your experience with board service": "None yet, but eager to learn.",
    "What size of non-profit are you most interested in serving on?": "Small, local impact",
    "Who is your employer": "Tech Solutions",
    "What is your role Occupation/role": "Product Manager",
    "Age": "25-34",
    "Chose how you identify yourself": "Man",
    "Race/ethnicity": "Hispanic",
    "Dates candidate is available": {
      "Monday": "Monday",
      "Tuesday": "Tuesday",
      "Wednesday": None,
      "Thursday": None,
      "Friday": "Friday"
    },
    "Times candidate is available": {
      "10am-1pm": None,
      "1pm-4pm": "1pm-4pm",
      "4pm-7pm": "4pm-7pm"
    },
    "Where are you located?": "California",
    "Response Type": "completed",
    "Start Date (UTC)": "2024-09-30 14:10:32",
    "Stage Date (UTC)": None,
    "Submit Date (UTC)": "2024-09-30 14:25:32",
    "Network ID": "abc123xyz",
    "Tags": None
}
]

# List of nonprofit organizations
nonprofit_list = [
    {
        "name": "Tech for Good",
        "focus_areas": ["Technology", "Education and youth development"],
        "skills_needed": ["Project management", "Technology"],
        "location": "California",
        "time_slots": ["1pm-4pm", "4pm-7pm"]
    },
    {
        "name": "Green Earth",
        "focus_areas": ["Environmental sustainability", "Social justice"],
        "skills_needed": ["Marketing", "Diversity, equity, inclusion"],
        "location": "New York",
        "time_slots": ["10am-1pm"]
    }
]

# Function to format the candidate's causes and skills
def format_nested_data(nested_dict):
    return ", ".join([value for key, value in nested_dict.items() if value])

# Define a function to call the OpenAI API
def match_candidate_to_nonprofits(candidate, nonprofits):
    # Extract candidate details
    candidate_name = candidate['Enter your name']
    candidate_skills = format_nested_data(candidate['Skills candidate is hoping to bring to the nonprofit'])
    candidate_interests = format_nested_data(candidate['Causes or social issues candidate is most passionate about supporting'])
    candidate_availability = candidate['Dates candidate is available']
    candidate_time_slots = candidate['Times candidate is available']
    candidate_location = candidate['Where are you located?']

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
        Nonprofit Name: {nonprofit['name']}
        Focus Areas: {', '.join(nonprofit['focus_areas'])}
        Skills Needed: {', '.join(nonprofit['skills_needed'])}
        Location: {nonprofit['location']}
        Time Slots: {', '.join(nonprofit['time_slots'])}
        """

    prompt += """
    Based on the candidate's skills, interests, availability, and location, suggest the best matching nonprofit(s) for the candidate and explain why.
    """

    # Call OpenAI API
    response = client.chat.completions.create(model="gpt-4",
    messages=[
        {"role": "system", "content": "You are an assistant that matches candidates to nonprofit organizations."},
        {"role": "user", "content": prompt}
    ],
    max_tokens=500,
    temperature=0.5)

    # Extract and return the response
    return response.choices[0].message.content.strip()

# Call the matching function and print the result
for candidate in candidates:
    best_match = match_candidate_to_nonprofits(candidate, nonprofit_list)
    print(f"Best Match for {candidate['Enter your name']}: \n", best_match)