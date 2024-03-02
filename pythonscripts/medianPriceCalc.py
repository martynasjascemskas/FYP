import pandas as pd
import os
import re

def extract_year_from_filename(filename):
    match = re.search(r'(\d{4})', filename)
    return match.group(0) if match else None

def calculate_median_prices_for_year(file_path):
    df = pd.read_csv(file_path, usecols=['postcode', 'price'])
    df['price'] = df['price'].astype(float)
    return df.groupby('postcode')['price'].median().astype(int)

postcodes_df = pd.read_csv('combined_postcodes.csv')

for filename in os.listdir('.'):
    if filename.startswith('reduced_pp-') and filename.endswith('.csv'):
        year = extract_year_from_filename(filename)
        if year:
            median_prices = calculate_median_prices_for_year(filename)
            postcodes_df = postcodes_df.fillna(0)
            postcodes_df = postcodes_df.join(median_prices, on='pcds', rsuffix=f'_median_price_{year}')
            postcodes_df = postcodes_df.fillna(0)

postcodes_df.to_csv('combined_postcodes_median_prices.csv', index=False)

# Create a new csv file called "combined_postcodes_prices.csv". 
# Calculate the median price per year per postcode using csv files called "reduced_pp-<year>.csv".
# There are multiple files with different years. 
# Using the "combined_postcodes.csv" file which looks like picture 1,
# create new columns for each year so that the first row in the csv file looks like: 'pcds, lat, long, median_price_<year>,median_price_<year>,
# median_price_<year>, median_price_<year>, median_price_<year> and so on. Get the <year> variable from the "reduced_pp-<year>.csv" file name.