import pandas as pd
import os

directory = 'C:\\Users\\M\\Desktop\\multi_csv_homes'
columns_to_remove = [0, 6, 14, 15]

for filename in os.listdir(directory):
    if filename.endswith('.csv'):
        file_path = os.path.join(directory, filename)
        df = pd.read_csv(file_path)
        df.drop(df.columns[columns_to_remove], axis=1, inplace=True)
        new_file_path = os.path.join(directory, f'reduced_{filename}')
        df.to_csv(new_file_path, index=False)

        print(f'Processed and saved reduced file at {new_file_path}')

print('All files have been processed.')

# ChatGPT 3.5 Default: Can you make a python script to remove the A, G, O, P columns in csv?
# Removes unnecessary columns from houses CSV files. (Reduces)