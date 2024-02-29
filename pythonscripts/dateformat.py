import pandas as pd

input_file = 'C:\\Users\\Martynas\\Downloads\\combined_csv123.csv'

df = pd.read_csv(input_file)
df['date'] = pd.to_datetime(df['date'], format='%m/%d/%Y %H:%M')
df['date'] = df['date'].dt.strftime('%Y-%m-%d')

output_file = 'your_output_file.csv'

df.to_csv(output_file, index=False)

print("'{output_file}' has been created with the updated date format.")
#Changes date format from "16-04-2015" to "2015-04-16"
