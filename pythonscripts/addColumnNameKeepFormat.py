import pandas as pd
import os

# Directory where your CSV files are stored
directory = 'C:\\Users\\M\\Desktop\\multi_csv_homes'

# List to hold DataFrames
dataframes_list = []

# Define the indices of the desired columns (0-indexed)
desired_column_indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]  # Corresponding to A, B, C, D, E, H

# Iterate over each file in the directory
for filename in os.listdir(directory):
    if filename.endswith('.csv'):  # Check if the file is a CSV
        file_path = os.path.join(directory, filename)
        # Read the CSV file into a DataFrame without headers
        df = pd.read_csv(file_path, header=None, low_memory=False)
        
        # Select only the desired columns using the column indices
        selected_columns_df = df.iloc[:, desired_column_indices]
        
        # Add the DataFrame to our list
        dataframes_list.append(selected_columns_df)

# Combine all DataFrames into one
combined_df = pd.concat(dataframes_list, ignore_index=True)

# Optionally, assign new column headers to the combined DataFrame
combined_df.columns = ['price', 'date', 'postcode', 'type', 'new_build', 'address1', 'address2', 'address3', 'address4', 'address5', 'address6', 'address7']

# Save the combined DataFrame to a new CSV file
combined_df.to_csv('combined_csv.csv', index=False)

# Can you keep the format in A B C D E F G H I J K L since there is no column name. 
# Add column name and keep format.