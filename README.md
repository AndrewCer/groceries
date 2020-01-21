# Grocery App Monorepo

Please follow the details below to get the app spun up locally.

## Requirements to run

- Node
- MongoDB installed locallyLocal mongoDB and a writeable /data/db directory
    - Mac users - follow the install as well as "Using MongoDB" steps listed here: https://zellwk.com/blog/install-mongodb/
- `mongod` bash command
    

## Running the monorepo locally

- Run `mongo` in your terminal to launch local MongoDB
- `cd frontend` & `npm i`
- `cd backend` & `npm i`
- `cd ..`
- `npm i` from project root
- `npm run start` from project root
    - starts backend server
    - serves ionic

## Running in Xcode emulator

- `cd frontent`
- `npm run build`
- `npm run ios`



### Notes

Backend tests require that you have `mongod` running locally.

The front end directory structure is based off of this: [highly scalable folder structure](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)

The api runs at `http://localhost:4000`.

Hit the `/api/groceries` endpoint to see an array of all of the persisted items.

This app is configured to run locally and is not setup for a production environment.

This app has not been tested in a Windows environment.


### Screenshots

Home Page
![home page](/screenshots/home-page.png?raw=true)

Edit Page
![edit page](/screenshots/edit-page.png?raw=true)