# Guess the score app

This repository is part of score guessing app project containing frontend and backend implementation. Here you can find fully implemented backend an frontend implementation that is ready to be cloned and used. 
You can try the app here: https://main--jolly-lolly-a515d1.netlify.app/

Once reached the page you can either try the app with test user or creating your own account. Once logged in user is displayed the app with today's games, one selected game, scoreboard and laegue scoreboard.

## 1. Features
- Guessing game - The app has top 6 leagues games (La Liga, Premier League, Bundesliga, Serie A, Eredivisie and Ligue 1) and also includes events such as UEFA Champions League, UEFA European Championship and FIFA World Cup) which user is allowed to guess the score and compete with other players
- League table - for each selected game user is provided with league scoretable to be able to analize each teams form and have better chance of guessing the correct score
- Live score - each games score is upadted once a minute which allows user to see the actual score and calculated possible points to be recived (Future update here is websockets that will update the score)
- Creating leagues - user is able to create league to compete with friends, league can count only certain leagues and have different scoring rules
- Browsing games - the app provides user with up to 30 days forward games and these can be easily browsed by switch the date
- Browsing other users guesses - once the game is started user is able to check what score another user had guessed and how many points will or has recived
- Virtual oponents - In the app there are 100 virtual players that are guessing the score for the games everyday, try to beat them!

## 2. Tech stack
### Backend
1. Node.js
2. Sequelize ORM
3. express.js
4. Faker library for tests and init data

### Frontend
1. React.js
2. React redux
3. Material UI + inline css

## 3. How does it work

### Backend 
#### API
Some of data is ready to be passed via API, such as older messages, conversations or users. This happend whenever client sends a request. In this case, similar as in sockets, authentication data is passed though middleware that checks if user is eliable for access.
#### DB
For storing data this project uses DB. Localy using SQLite, in production server I decided to switch to MySQL. To communicate with DB from the server I decided to use Sequelize ORM which allows to write clean, SQL free code. Created tables store data such as User's data, converations, messages etc. DB diagram can be seen below.
![image](https://github.com/FilipZmija/GuessTheScore/assets/94125339/a439845e-40ad-44e7-977f-6d408600a6b5)

### Frontend

### 4. How to run
Clone repo
```
   git clone https://github.com/FilipZmija/ChatApp-backend.git
```
### Backend
Install dependencies
```
cd ChatApp-backend
cd backend
npm install
```
Start development server
```
node index.js
```
### Frontend

```
cd ChatApp-backend
cd frontend
npm install
```
Start development server
```
npm start
```
