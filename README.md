# COVID



## Description

This is an app to document adults and children about COVID-19 . 

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

- **Signup:** As an anon I can sign up in the platform so that I can start playing into competition

- **Login:** As a user I can login to the platform so that I can play competitions

- **Logout:** As a user I can logout from the platform so no one else can use it

- **View Global Dashboard** As a user I want to see the tournament table

- **View Countries Stats** As a user I can see the COVID-19 stats of every country

- **Play a mini-game** As a user I can play a mini-game

  ****

## Backlog

User profile:

- add some music
- change game mode to FFA
- Add recent news
- Points system and rewards
- More components not just COVID bubbles



# Client / Frontend

## React Router Routes (React App)

| Path           | Component  | Permissions             | Behavior                                                     |
| -------------- | ---------- | ----------------------- | ------------------------------------------------------------ |
| `/`            | Welcome    | public `<Route>`        | Home page                                                    |
| `/login`       | Login      | public `<Route>`        | Login                                                        |
| `/signup`      | Signup     | public `<Route>`        | Signup                                                       |
| `/difficulty`  | ChooseDiff | public `<Route>`        | Selector                                                     |
| `/signup`      | SignupPage | anon only `<AnonRoute>` | Signup form, link to login, navigate to game mode.           |
| `/login`       | LoginPage  | anon only `<AnonRoute>` | Login form, link to signup, navigate to game mode. Always pops up when user tries to play |
| `/game`        | Game       | anon only `<AnonRoute>` | Mini-game displays                                           |
| `/game/result` | Result     | anon only `<AnonRoute>` | Shows the mini-game resoult                                  |
| /home          | Home       | anon only `<AnonRoute>` | Covid related info                                           |
| /user          | User       | anon only `<AnonRoute>` | Dashboard of users and ranks                                 |



## Components

- **LoginPage**
- **SIgnUpPage**
- **ChooseDifficulty**
- **Game** / CovidBubble
- **GameResult** / ImageBox / Replay / WorldItem
- **TableRank** / UserBox 
- **Home **/ SearchBarCountries/ CovidMap / NumbersDisplay
- **Navbar** / WorldItem/VideogameItem/UserItem

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Countries Data
  - countires.list()
  - countries.detail(id)
  - global
- Player Service
  - player.detail(id)
- Game Service
  - Game.put(id)



# Server / Backend

## Models

User model

```
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  img: {type: String},
  arrayScore: [{type: Schema.Types.ObjectId,ref:'Game'}],
}
```

Game model

```
 {
   score: {type: String, required: true},
   userId:{type: Schema.Types.ObjectId,ref:'User'}
 }
```





## API Endpoints (backend routes)

| HTTP Method | URL                | Request Body            | Success status | Error Status | Description                                                  |
| ----------- | ------------------ | ----------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile`    | Saved session           | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`     | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`      | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`     | (empty)                 | 204            | 400          | Logs out the us                                              |
| POST        | `/result`          | {userId,score}          | 201            | 400          | Create and save a new result                                 |
| GET         | `/users`           |                         |                | 400          | show players                                                 |
| PUT         | `/user/edit`       | {name,img}              | 201            | 400          | edit player                                                  |
| DELETE      | `/players/delete/` | {id}                    | 200            | 400          | delete player                                                |



## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/aAIAef2s/the-covid) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/krankie-code/covid-app-client)

[Server repository Link](https://github.com/krankie-code/covid-app-server)

[Deployed App Link](http://heroku.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com/)