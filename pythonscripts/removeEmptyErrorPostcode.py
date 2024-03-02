import pandas as pd

file_path = './modified_data.csv'
df = pd.read_csv(file_path)

def all_prices_zero(row):
    return all(row[f'median_price_{year}'] == 0.0 for year in range(2015, 2023))

# Remove rows based on the conditions
df = df[df['lat'] != 99.999999]
df = df[~df.apply(all_prices_zero, axis=1)]

cleaned_file_path = 'cleaned_data.csv'
df.to_csv(cleaned_file_path, index=False)

# Create a python script to remove similar rows:
# pcds,lat,long,median_price_2015,median_price_2016,median_price_2017,median_price_2018,median_price_2019,median_price_2020,median_price_2021,median_price_2022
# AB1 0AA,57.101474,-2.242851,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
# AB23 9AA,99.999999,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0
# I want to remove these lines because 2nd line has 99.999999 as lat value. This isn't correct and therefore the row must be removed.
# I want to remove line 1 because it has 0.0 as the median_price for each year and provides no value to me. 