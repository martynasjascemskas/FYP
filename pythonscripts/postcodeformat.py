import pandas as pd
import os

directory = 'C:\\Users\\M\\Desktop\\multi_csv_postcodes'

for filename in os.listdir(directory):
    if filename.endswith('.csv'): 
        file_path = os.path.join(directory, filename)
        df = pd.read_csv(file_path)
        df = df[['pcds', 'lat', 'long']]
        df.to_csv(os.path.join(directory, f'reduced_{filename}'), index=False)
        print(f'Processed {filename}')

print('All files have been processed.')

# ChatGPT 3.5 Default: I have multiple csv files which contain: pcd, pcd2, pcds, dointr, doterm, oscty, ced, oslaua, osward, parish, usertype, oseast1m, osnrth1m, osgrdind, oshlthau, 
# nhser, ctry, rgn, streg, pcon, eer, teclec, ttwa, pct, itl, statsward, oa01, casward, npark, lsoa01, msoa01, ur01ind, oac01, oa11, lsoa11, msoa11, wz11, sicbl, 
# bua11, buasd11, ru11ind, oac11, lat, long, lep1, lep2, pfa, imd, calncv, icb, oa21, lsoa21, msoa21. 
# Can you make a python script to remove all columns except "pcds", "lat", "long" columns?
# Removes all unnecessary rows and keeps "pcds: postcode", "lat: Latitude", "long: Longtitude"