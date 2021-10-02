# Referrers Tracker

List referrers' top 3 links and counts whenever a click is done on it.

## Requirements:

### It uses:

- [Docker](https://docker.com) (To run dev environment and/or MongoDB service)
- [Node.js](https://nodejs.org) 15.5.1
- [MongoDB](https://mongodb.com) 4.4.3
- [Vue.js](https://vuejs.org) 2 as UI framework
- [Buefy](https://buefy.org) as CSS framework

---

## Run Dev Environment:

- Open a terminal
- Clone project
- Enter into project folder
- Copy .env.example file and rename it as .env

### To run dev environment on a single terminal:

```bash
 docker-compose up
```

### To run dev environment on two separate terminals:

> Note: It's recommended to create .env files for client and server, so you should copy each section into separate files under each folder. But the only mandatory env variable is specified below.

- Comment server and client services on the docker-compose file
- Run docker compose file to run DB in case you don't have a local mongoDB service running
  - `docker-compose up -d`
- Enter into server folder and run server app
- Add a .env file with `TOKEN_KEY` var for JWT encription
- Install modules
  - `yarn install`
- Run seeder
  - `yarn run seed`
- Run dev server
  - `yarn run dev`
- Open a new terminal
- Enter into client folder and run client app
  - `yarn install`
  - `yarn run serve`

---

### The seeder adds:

> 1 User with these fields:

- User: `admin`
- Password: `asdf`

> 4 Urls with these fields:

- href: `String`
- hostname: `String`
- protocol: `String`
- clicks: `Number`

## MongoDB Service:

The DB service starts without any password; they are commented for simple and quick start purposes. If you want to use add them, you need to modify the connection string in the `server/db/database.js` file, and uncomment `DB_USER` and `DB_PASSWORD` env vars in the docker-compose file and in .env file.

## TODO: Some fixes to improve the project:

- &check; Fix docker issues, to containerize backend and frontend
- ~~[] Better frontend validationslinks~~
- ~~[] Add form to save new urls links~~
- ~~[] List all url links~~

> Note: This development is closed, I will fork the project to implement all these features on a different approach.
