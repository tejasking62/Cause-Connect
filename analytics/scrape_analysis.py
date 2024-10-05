import json
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import streamlit as st

# Load the JSON data
with open('C:/Users/pavan/Team-4/analytics/ngos_data.json', 'r') as json_file:
    ngos_data = json.load(json_file)

# Convert to DataFrame
df = pd.DataFrame(ngos_data)

# Data preprocessing
df['County Served'] = df['County Served'].str.split('; ')
df = df.explode('County Served')
df = df.explode('Sector')

# Set page config
st.set_page_config(page_title="NGO Data Analysis Dashboard", layout="wide")

# Custom CSS to improve layout
st.markdown("""
<style>
.big-font {
    font-size:30px !important;
    font-weight: bold;
}
.medium-font {
    font-size:24px !important;
    font-weight: bold;
}
.small-font {
    font-size:18px !important;
}
</style>
""", unsafe_allow_html=True)

# Title and description
st.markdown('<p class="big-font">NGO Data Analysis Dashboard</p>', unsafe_allow_html=True)
st.markdown('<p class="small-font">This dashboard provides insights into NGO operations across different counties and sectors.</p>', unsafe_allow_html=True)

# Sidebar for filtering
st.sidebar.markdown('<p class="medium-font">Filters</p>', unsafe_allow_html=True)
selected_county = st.sidebar.multiselect("Select County", df['County Served'].unique())
selected_sector = st.sidebar.multiselect("Select Sector", df['Sector'].unique())

# Apply filters
if selected_county:
    df = df[df['County Served'].isin(selected_county)]
if selected_sector:
    df = df[df['Sector'].isin(selected_sector)]

# Dashboard layout
col1, col2 = st.columns(2)

with col1:
    st.markdown('<p class="medium-font">NGOs by County</p>', unsafe_allow_html=True)
    county_counts = df['County Served'].value_counts()
    fig, ax = plt.subplots(figsize=(10, 6))
    county_counts.plot(kind='bar', ax=ax)
    plt.title("Number of NGOs by County")
    plt.xlabel("County")
    plt.ylabel("Number of NGOs")
    plt.xticks(rotation=45, ha='right')
    st.pyplot(fig)

with col2:
    st.markdown('<p class="medium-font">Top 10 Sectors</p>', unsafe_allow_html=True)
    sector_counts = df['Sector'].value_counts().head(10)
    fig, ax = plt.subplots(figsize=(10, 6))
    sector_counts.plot(kind='bar', ax=ax)
    plt.title("Top 10 NGO Sectors")
    plt.xlabel("Sector")
    plt.ylabel("Number of NGOs")
    plt.xticks(rotation=45, ha='right')
    st.pyplot(fig)

st.markdown('<p class="medium-font">NGO Office Locations</p>', unsafe_allow_html=True)
office_locations = [loc for locations in df['Office Locations'] for loc in locations]
location_counts = pd.Series(office_locations).value_counts()
fig, ax = plt.subplots(figsize=(12, 6))
location_counts.plot(kind='bar', ax=ax)
plt.title("NGO Office Locations")
plt.xlabel("Location")
plt.ylabel("Number of NGOs")
plt.xticks(rotation=45, ha='right')
st.pyplot(fig)

st.markdown('<p class="medium-font">Sector Distribution Heatmap</p>', unsafe_allow_html=True)
sector_county_pivot = pd.crosstab(df['Sector'], df['County Served'])
fig, ax = plt.subplots(figsize=(12, 8))
sns.heatmap(sector_county_pivot, annot=True, fmt='d', cmap='YlOrRd', ax=ax)
plt.title("Sector Distribution Across Counties")
plt.xlabel("County")
plt.ylabel("Sector")
st.pyplot(fig)

st.markdown('<p class="medium-font">NGO Details</p>', unsafe_allow_html=True)
st.dataframe(df[['NGO Name', 'County Served', 'Sector', 'Office Locations']], height=400)

# Add some spacing at the bottom
st.markdown("<br><br>", unsafe_allow_html=True)