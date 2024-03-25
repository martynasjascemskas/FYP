import pandas as pd
import os

directory = 'C:\\Users\\M\\Desktop\\multi_csv_postcodes'
dataframes_list = []

for filename in os.listdir(directory):
    if filename.startswith('reduced_') and filename.endswith('.csv'):
        file_path = os.path.join(directory, filename)
        df = pd.read_csv(file_path)
        dataframes_list.append(df)

combined_df = pd.concat(dataframes_list, ignore_index=True)

combined_file_path = os.path.join(directory, 'combined_postcodes.csv')
combined_df.to_csv(combined_file_path, index=False)

print(f'All files have been combined into {combined_file_path}')

# ChatGPT 3.5 Default: I need to combine the reduced postcode csv files into 1 file. Can you do that for me?