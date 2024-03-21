import pandas as pd

file_path = './combined_postcodes_median_prices.csv'
df = pd.read_csv(file_path)

def calculate_median_price(row):
    prices = row[3:11]
    non_zero_prices = prices[prices != 0.0]
    if non_zero_prices.empty:
        return 0
    else:
        return int(non_zero_prices.median().round())

df['median_price_all_years'] = df.apply(calculate_median_price, axis=1)

columns = list(df.columns)
new_order = columns[:3] + ['median_price_all_years'] + columns[3:-1]
df = df[new_order]

modified_file_path = 'modified_data.csv'
df.to_csv(modified_file_path, index=False)

# ChatGPT 3.5 Default: Can you create a new column which goes after "long" column which would represent the median price of the postcode throughout all the years. 
# All of the year price is displayed in columns with index 3,4,5,6,7,8,9,10. indexes 0 = pcds, 1 = lat, 2 = long.