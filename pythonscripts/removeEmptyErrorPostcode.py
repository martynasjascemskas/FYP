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