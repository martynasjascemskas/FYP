# FYP

Final year project in collaboration with Phil Maguire.
Visualisation tool for Postcode price.

[Trello board](https://trello.com/b/W8BPwKf3/final-year-project-martynas)

# Google Drive CSV Files | Draft Wireframes:

[Google Drive](https://drive.google.com/drive/folders/1Eys_iTOJ0MV4imoWZ1SbSlDGU6ZDrpk-?usp=sharing)

# How to run project:
Project developed using Node version: `v20.11.0` \
If running main, you need to create a MongoDB local database. See [database](https://github.com/martynasjascemskas/FYP/tree/main/database)
## Running sample: 
### Backend: 
Add .env(containing PORT and MongoDB connection) file to `backend/sample/` directory
### Frontend: 
Add .env(containing google maps api) file to `frontend/sample/` directory 

**Make sure to run backend before frontend** \
Backend : `npm install` && `npm run dev` \
Frontend: `npm install --legacy-peer-deps` && `npm run dev`. `--legacy-peer-deps is IMPORTANT, since some features use older dependencies` 
