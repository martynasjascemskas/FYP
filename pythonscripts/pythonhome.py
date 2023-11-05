import pandas as pd
import os

# Directory where your CSV files are stored
directory = 'C:\\Users\\M\\Desktop\\multi_csv_homes'

# Column indices you want to remove (A, G, O, P are 1, 7, 15, 16 in 1-based index)
# Convert them to 0-based index for use in Python
columns_to_remove = [0, 6, 14, 15]

# Iterate over each file in the directory
for filename in os.listdir(directory):
    if filename.endswith('.csv'):  # Check if the file is a CSV
        file_path = os.path.join(directory, filename)
        # Read the CSV file into a DataFrame
        df = pd.read_csv(file_path)

        # Drop columns by index
        df.drop(df.columns[columns_to_remove], axis=1, inplace=True)

        # Save the reduced DataFrame to a new CSV file
        new_file_path = os.path.join(directory, f'reduced_{filename}')
        df.to_csv(new_file_path, index=False)

        print(f'Processed and saved reduced file at {new_file_path}')

print('All files have been processed.')

# Can you make a similar python script to remove the A, G, O, P columns in csv?