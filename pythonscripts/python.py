import pandas as pd
import os

# Directory where your CSV files are stored
directory = 'C:\\Users\\M\\Desktop\\multi_csv_postcodes'

# Iterate over each file in the directory
for filename in os.listdir(directory):
    if filename.endswith('.csv'):  # Check if the file is a CSV
        file_path = os.path.join(directory, filename)
        # Read the CSV file into a DataFrame
        df = pd.read_csv(file_path)

        # Select only the columns we want to keep
        df = df[['pcds', 'lat', 'long']]

        # Save the reduced DataFrame to a new CSV file
        # You can change the prefix or choose a different naming convention for the new files
        df.to_csv(os.path.join(directory, f'reduced_{filename}'), index=False)

        print(f'Processed {filename}')

print('All files have been processed.')

# I have multiple csv files which contain: pcd, pcd2, pcds, dointr, doterm, oscty, ced, oslaua, osward, parish, usertype, oseast1m, osnrth1m, osgrdind, oshlthau, 
# nhser, ctry, rgn, streg, pcon, eer, teclec, ttwa, pct, itl, statsward, oa01, casward, npark, lsoa01, msoa01, ur01ind, oac01, oa11, lsoa11, msoa11, wz11, sicbl, 
# bua11, buasd11, ru11ind, oac11, lat, long, lep1, lep2, pfa, imd, calncv, icb, oa21, lsoa21, msoa21. 
# Can you make a python script to remove all columns except "pcds", "lat", "long" columns?