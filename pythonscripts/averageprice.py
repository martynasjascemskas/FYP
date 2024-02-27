import pandas as pd
import os
import re

# Function to extract year from the filename
def extract_year_from_filename(filename):
    match = re.search(r'(\d{4})', filename)
    return match.group(0) if match else None

# Function to calculate average prices per year per postcode
def calculate_average_prices_for_year(file_path):
    df = pd.read_csv(file_path, usecols=['postcode', 'price'])
    df['price'] = df['price'].astype(float)
    return df.groupby('postcode')['price'].mean().astype(int)

# Step 1: Load the postcode data
postcodes_df = pd.read_csv('combined_postcodes.csv')
# Step 2: Calculate the average price per postcode for each year and add it as a new column
for filename in os.listdir('.'):
    if filename.startswith('reduced_pp-') and filename.endswith('.csv'):
        year = extract_year_from_filename(filename)
        if year:
            avg_prices = calculate_average_prices_for_year(filename)
            postcodes_df = postcodes_df.fillna(0)
            postcodes_df = postcodes_df.join(avg_prices, on='pcds', rsuffix=f'_avg_price_{year}')
            postcodes_df = postcodes_df.fillna(0)

# Step 3: Output the combined data to a new CSV
postcodes_df.to_csv('combined_postcodes_prices.csv', index=False)

# GPT4 ->
# Create a new csv file called "combined_postcodes_prices.csv". 
# Calculate the average price per year per postcode using csv files called "reduced_pp-<year>.csv".
# There are multiple files with different years. 
# Using the "combined_postcodes.csv" file which looks like picture 1,
# create new columns for each year so that the first row in the csv file looks like: 'pcds, lat, long, avg_price_<year>,avg_price_<year>,
# avg_price_<year>, avg_price_<year>, avg_price_<year> and so on. Get the <year> variable from the "reduced_pp-<year>.csv" file name.