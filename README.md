# Guess the score app

This repository is part of score guessing app project containing frontend and backend implementation. Here you can find fully implemented backend an frontend implementation that is ready to be cloned and used. 
You can try the app here: https://main--jolly-lolly-a515d1.netlify.app/

Once reached the page you can either try the app with test user or creating your own account. Once logged in user is displayed the app with today's games, one selected game, scoreboard and laegue scoreboard.

## 1. Features
<li>
   Guessing game - The app has top 6 leagues games (La Liga, Premier League, Bundesliga, Serie A, Eredivisie and Ligue 1) and also includes events such as UEFA Champions League, UEFA European Championship and FIFA World Cup) which user is allowed to guess the  score and compete with other players.
   <p align="center">
     <img width="460" height="300" src="https://github.com/FilipZmija/GuessTheScore/assets/94125339/3e4a2180-a548-47de-b977-ae86a7fcde6d">
   </p>
</li>
<li>
   League table - for each selected game user is provided with league scoretable to be able to analize each teams form and have better chance of guessing the correct score
   <p align="center">
     <img width="460" src="https://github.com/FilipZmija/GuessTheScore/assets/94125339/62df35c6-ec24-4250-8239-7def3987314a">
   </p>
</li>
<li>
   Live score - each games score is upadted once a minute which allows user to see the actual score and calculated possible points to be recived (Future update here is websockets that will update the score)
</li>
<li> 
   Creating leagues - user is able to create league to compete with friends, league can count only certain leagues and have different scoring rules
   <p align="center">
     <img width="250" src="https://github.com/FilipZmija/GuessTheScore/assets/94125339/6b1f6028-c7ad-4f4a-b627-8dcdbc4812a6">
   </p>
</li>
    
   <p align="center">
     <img width="460" src="https://github.com/FilipZmija/GuessTheScore/assets/94125339/dd9ca5f0-3d91-4009-81cf-4acf3ec3d539">
   </p>
<li>
   Browsing games - the app provides user with up to 30 days forward games and these can be easily browsed by switch the date
</li>
<li>
   Browsing other users guesses - once the game is started user is able to check what score another user had guessed and how many points will or has recived
   <p align="center">
     <img width="460" src="https://github.com/FilipZmija/GuessTheScore/assets/94125339/e737c0b5-3e1f-41e7-93fe-088c97329176">
   </p>
</li>
<li>
   Virtual oponents - In the app there are 100 virtual players that are guessing the score for the games everyday, try to beat them!
</li>

 ![image](https://github.com/FilipZmija/GuessTheScore/assets/94125339/19a12484-7f66-4fd9-a9fc-c89c11c1fc22)

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

#### API
Data in the app is passed via API between backend and frontend. I created multiple routes that provide data for actual events, user scores, current games score, scoretable, league scoreboard and also the ones to create new leagues or guess the score. Frontend by sending multiple requests reaches that data and displays it. User can interact with the data and frontend takes care of the rest by sending PUT or POST requests. 
### External data
Football data is fully provided by the Football-Data.org API. Multiple functions create requests to reach that data and save it in my own database. At the init run of the app all teams, competitions and events are fetched from external API and saved to my database. All live scores are updated every minute also by sending requests and data is updated in my DB. This assures that limit for calls to external API is never reached and multiple users can interact with the data. This solution is also much safer, if anything wrong happens with external API then it can be changed to another one without using any previous data.
#### DB
For storing data this project uses database as previously mentioned. Localy using SQLite, in production server I decided to switch to MySQL. To communicate with DB from the server I decided to use Sequelize ORM which allows to write clean, SQL free code. Created tables store data such as User's data, events, competitions, scores, league tabels, scoreboard and much more. DB diagram can be seen below.
![image](https://github.com/FilipZmija/GuessTheScore/assets/94125339/a439845e-40ad-44e7-977f-6d408600a6b5)

### Frontend
#### React
The app was based on React with some reusable components for example the ones responsible or displaying game info or scoretable. Material UI provided me with some ready to use components. Some of the components had to be created from the scratch. Styling in the app was achived by using inline css. 
#### Redux
Since a lot of components of the app use anothers component's state I decided to take adventage of redux library which is my state manager for this project. Creating multiple slices esiecially for events, authorization, scoreboard or event handling allowed me to easily pass the data and make the flow very simple.

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
