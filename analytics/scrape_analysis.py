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

# Streamlit app
st.set_page_config(page_title="NGO Data Analysis Dashboard", layout="wide")
st.title("NGO Data Analysis Dashboard")

# Sidebar for filtering
st.sidebar.header("Filters")
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
    st.subheader("NGOs by County")
    county_counts = df['County Served'].value_counts()
    fig, ax = plt.subplots(figsize=(10, 6))
    county_counts.plot(kind='bar', ax=ax)
    plt.title("Number of NGOs by County")
    plt.xlabel("County")
    plt.ylabel("Number of NGOs")
    st.pyplot(fig)

with col2:
    st.subheader("Top 10 Sectors")
    sector_counts = df['Sector'].value_counts().head(10)
    fig, ax = plt.subplots(figsize=(10, 6))
    sector_counts.plot(kind='bar', ax=ax)
    plt.title("Top 10 NGO Sectors")
    plt.xlabel("Sector")
    plt.ylabel("Number of NGOs")
    plt.xticks(rotation=45, ha='right')
    st.pyplot(fig)

st.subheader("NGO Office Locations")
office_locations = [loc for locations in df['Office Locations'] for loc in locations]
location_counts = pd.Series(office_locations).value_counts()
fig, ax = plt.subplots(figsize=(12, 6))
location_counts.plot(kind='bar', ax=ax)
plt.title("NGO Office Locations")
plt.xlabel("Location")
plt.ylabel("Number of NGOs")
plt.xticks(rotation=45, ha='right')
st.pyplot(fig)

st.subheader("Sector Distribution Heatmap")
sector_county_pivot = pd.crosstab(df['Sector'], df['County Served'])
fig, ax = plt.subplots(figsize=(12, 8))
sns.heatmap(sector_county_pivot, annot=True, fmt='d', cmap='YlOrRd', ax=ax)
plt.title("Sector Distribution Across Counties")
plt.xlabel("County")
plt.ylabel("Sector")
st.pyplot(fig)

st.subheader("NGO Details")
st.dataframe(df[['NGO Name', 'County Served', 'Sector', 'Office Locations']])