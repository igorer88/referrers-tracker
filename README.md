# referrers-tracker

Tracks referrers to a website and their counts by domain

## Requirements:

### It uses:

- [Node.js](https://nodejs.org) 15.5.1
- [MongoDB](https://mongodb.com) 4.4.3
- [Docker](https://docker.com) (For mounting the MongoDB)
- [Vue.js](https://vuejs.org) 2 as UI framework
- [Buefy](https://buefy.org) as CSS framework

---

## Run Dev Enviroment:

- Clone project
- Enter into project folder
- Run docker compose file to run DB
  - `docker compose -d`
- Install modules
  - `yarn install`
- Run seeder
  - `yarn run seed`
- Run dev server
  - `yarn run dev`
- Enter into client folder and run client app
  - `yarn install`
  - `yarn run serve`

---

### The seeder adds:

> 1 User with these fields:

- User: `admin`
- Password: `asdf`

> 4 Url with these fields:

- href: `String`
- hostname: `String`
- protocol: `String`
- clicks: `Number`

> TODO: Some fixes to improve the project:

    - [] Fix docker issues, to containerize backend and frontend
    - [] Better frontend validations
    - [] Add form to save new urls links
    - [] List all url links
    - [] Manage user info
