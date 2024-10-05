import openai
from sentence_transformers import SentenceTransformer, util

openai.api_key =('sk-proj-OsP--RPm2UHOwGW6oQANsgt6SEA')
model = SentenceTransformer('all-MiniLM-L6-v2')
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
    "#": "boxnnaoy48qg29omnmboxinvofym0cfc",
    "What is your nonprofit\u2019s name?": "Nonprofit C",
    "Where is your nonprofit located?": "Other",
    "Under what category does your nonprofit fit best?":
      "Healthcare and mental care",
    "What skills are you looking to recruit for?": "Social media",
    "What size would you consider your nonprofit?":
      "Medium (regional or national impact)",
    "Are you willing to take someone in without prior board service?": 0,
    "What kind of experience does your nonprofit board offer?":
      "Community Outreach",
    "What are the most important skills to you?":
      "Advocating for a cause,Strategic planning,Fundraising,Having tough conversations,Reviewing a budget and/or profit and loss statement",
    "Do you want a candidate in a preferred age range?": "35-49",
    "What days would you want a candidate to be available?": "Wednesday",
    "What times would you want a candidate to be available?": "1pm-4pm",
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 02:39:31",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 02:41:38",
    "Network ID": "653e97acae",

  },
  {
    "#": "odwdp4nzj1xg6m9l36odwdp4nzlv2gcw",
    "What is your nonprofit\u2019s name?": "Nonprofit B",
    "Where is your nonprofit located?": "New Jersey",
    "Under what category does your nonprofit fit best?":
      "Healthcare and mental care",
    "What skills are you looking to recruit for?": "Project management",
    "What size would you consider your nonprofit?": "Large (global reach)",
    "Are you willing to take someone in without prior board service?": 0,
    "What kind of experience does your nonprofit board offer?":
      "Strategy and/or Governance",
    "What are the most important skills to you?":
      "Advocating for a cause,Strategic planning,Having tough conversations,Reviewing a budget and/or profit and loss statement,Fundraising",
    "Do you want a candidate in a preferred age range?": "35-49",
    "What days would you want a candidate to be available?": "Wednesday",
    "What times would you want a candidate to be available?": "10am-1pm",
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 02:34:45",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 02:38:36",
    "Network ID": "653e97acae",

  },
  {
    "#": "g90zltrzyndkmhsdg90o43h2a5876n7p",
    "What is your nonprofit\u2019s name?": "Nonprofit A",
    "Where is your nonprofit located?": "Other",
    "Under what category does your nonprofit fit best?": "Education",
    "What skills are you looking to recruit for?": "Project management",
    "What size would you consider your nonprofit?": "Small (local impact)",
    "Are you willing to take someone in without prior board service?": 1,
    "What kind of experience does your nonprofit board offer?":
      "Community Outreach",
    "What are the most important skills to you?":
      "Advocating for a cause,Fundraising,Strategic planning,Reviewing a budget and/or profit and loss statement,Having tough conversations",
    "Do you want a candidate in a preferred age range?": "25-34",
    "What days would you want a candidate to be available?": "Monday",
    "What times would you want a candidate to be available?": "1pm-4pm",
    "Response Type": "completed",
    "Start Date (UTC)": "2024-10-05 02:01:28",
    "Stage Date (UTC)": 'null',
    "Submit Date (UTC)": "2024-10-05 02:30:18",
    "Network ID": "653e97acae",

  },
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

# ... existing code ...


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

# Function to create a candidate paragraph
def create_candidate_paragraph(candidate):
    prompt = f"""
    Generate a concise candidate summary based on the following information:
    The candidate is passionate about {format_nested_data(candidate['Causes or social issues candidate is most passionate about supporting'])}, with a strong commitment to these causes. 
    They bring skills in {format_nested_data(candidate['Skills candidate is hoping to bring to the nonprofit'])}, which align well with their nonprofit interests. 
    They prefer working with small, local impact organizations and are available on {', '.join([day for day in candidate['Dates candidate is available'] if candidate['Dates candidate is available'][day]])}. 
    Create a summary that highlights their passions, skills, and availability in a professional tone.
    """
    return generate_paragraph(prompt)
# Function to create a nonprofit paragraph
def create_nonprofit_paragraph(nonprofit):
    prompt = f"""
    Generate a concise candidate summary based on the following information as someone who understands the mission of {nonprofit['What is your nonprofit’s name?']}, I know this organization is dedicated to {nonprofit['Under what category does your nonprofit fit best?']}. 
    They are seeking individuals with skills in {nonprofit['What skills are you looking to recruit for?']} to enhance their impact. 
    The nonprofit values contributions in {nonprofit['What kind of experience does your nonprofit board offer?']}, and prefers candidates available on {nonprofit['What days would you want a candidate to be available?']}. 
    The organization is {nonprofit['What size would you consider your nonprofit?']} and is {nonprofit['Are you willing to take someone in without prior board service?']} to accepting individuals without prior board service.
    """
    return generate_paragraph(prompt)

# Function to compute similarity score using TF-IDF
# def compute_similarity(candidate_paragraph, nonprofit_paragraph):
#     documents = [candidate_paragraph, nonprofit_paragraph]
#     tfidf_vectorizer = TfidfVectorizer()
#     tfidf_matrix = tfidf_vectorizer.fit_transform(documents)
#     similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
#     return similarity[0][0] * 100  # Convert to percentage

# def compute_similarity(candidate_paragraph, nonprofit_paragraph):
#     # Encode the paragraphs to get their embeddings
#     candidate_embedding = model.encode(candidate_paragraph, convert_to_tensor=True)
#     nonprofit_embedding = model.encode(nonprofit_paragraph, convert_to_tensor=True)
    
#     # Compute cosine similarity between the embeddings
#     similarity = util.pytorch_cos_sim(candidate_embedding, nonprofit_embedding)
    
#     return similarity.item() * 100  # Convert to percentage

# Function to compute similarity score using GPT
def compute_similarity_with_gpt(candidate_paragraph, nonprofit_paragraph):
    prompt = f"""
    You are an assistant that evaluates the compatibility between a candidate and a nonprofit organization based on their profiles.
    
    Candidate Profile:
    {candidate_paragraph}
    
    Nonprofit Profile:
    {nonprofit_paragraph}
    
    Based on the information provided, evaluate the compatibility between the candidate and the nonprofit. Provide a match percentage and a brief explanation of the reasoning behind the score.
    """
    
    # Call OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an assistant that evaluates compatibility between candidates and nonprofits."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.5
    )
    
    # Extract and return the response
    return response.choices[0].message['content'].strip()

# Store results
results = []

# Call the functions and store the results
for candidate in candidates:
    candidate_paragraph = create_candidate_paragraph(candidate)
    
    for nonprofit in nonprofit_list:
        nonprofit_paragraph = create_nonprofit_paragraph(nonprofit)
        similarity_score = compute_similarity_with_gpt(candidate_paragraph, nonprofit_paragraph)
        
        # Assuming the response is in the format "Match Percentage: X% - Explanation: ..."
        match_percentage = float(similarity_score.split('%')[0].split(':')[-1].strip())
        
        results.append({
            "candidate_name": candidate['Enter your name'],
            "nonprofit_name": nonprofit['What is your nonprofit’s name?'],
            "nonprofit_summary": nonprofit_paragraph,
            "category": nonprofit['Under what category does your nonprofit fit best?'],
            "location": nonprofit['Where is your nonprofit located?'],
            "match_percentage": match_percentage,
            "explanation": similarity_score
        })


# Convert results to JSON
import json
results_json = json.dumps(results, indent=4)

# Print the JSON results
print("Results JSON:\n", results_json)

# Find the nonprofit with the highest match score for each candidate
for candidate in candidates:
    candidate_results = [result for result in results if result['candidate_name'] == candidate['Enter your name']]
    best_match = max(candidate_results, key=lambda x: x['match_percentage'])
    print(f"Best match for {candidate['Enter your name']}: {best_match['nonprofit_name']} with {best_match['match_percentage']}% match")