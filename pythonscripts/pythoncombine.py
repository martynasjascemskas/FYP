import pandas as pd
import os

# Directory where your reduced CSV files are stored
directory = 'C:\\Users\\M\\Desktop\\multi_csv_postcodes'

# List to hold DataFrames
dataframes_list = []

# Iterate over each file in the directory
for filename in os.listdir(directory):
    if filename.startswith('reduced_') and filename.endswith('.csv'):  # Check if the file is a reduced CSV
        file_path = os.path.join(directory, filename)
        # Read the reduced CSV file into a DataFrame
        df = pd.read_csv(file_path)

        # Add the DataFrame to our list
        dataframes_list.append(df)

# Combine all DataFrames in the list into a single DataFrame
combined_df = pd.concat(dataframes_list, ignore_index=True)

# Save the combined DataFrame to a new CSV file
combined_file_path = os.path.join(directory, 'combined_postcodes.csv')
combined_df.to_csv(combined_file_path, index=False)

print(f'All files have been combined into {combined_file_path}')

# I need to combine the reduced postcode csv files into 1 file. Can you do that for me?