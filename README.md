# Using this project
Both the client and the server need to be running independently.
The backend uses the port 3000 by default.
The frontend does not have its own server, so you'll have to run it yourself.

## Running the Backend
This is very easy. You just run `npm run dev` and... voilà! It works!

> [!WARNING]
> This will return an error if you havent installed the dependencies first.
> Check the section "[Before using > Installing Modules](https://github.com/KazzK94/fullstack-mysql-login/blob/main/README.md#installing-modules)" below for more details.

## Running the Frontend
As mentioned earlier, you will need to create a server for the frontend to work.
This is up to you. Any http server will work.
VS Code extensions like "Live Preview" are an easy option.

# Before using

## Installing modules
It's important to run `npm install` (while inside `/backend`) before running the backend server, so all dependencies get installed.
A 'node_modules' folder will be created with all the necessary dependencies and their own dependencies as well.
This only needs to be done once, preferably right after cloning the repo.

## Database Config
All database config is established in `/backend/services/db.js`.
You need to change the values of the object passed to `mysql.createConnection({ /* object is here */ })` so it contains your database's information.

# Disclaimers

## JWT Storage
> [!CAUTION]
> The way that the frontend side stores the JWT token (localStorage) is NOT safe.
> It has been made like that because this project's intent is purely for learning purposes.
> Once in production, it should be safely stored in a more secure way, such as http-only cookies.

## Environment Variables
> [!WARNING]
> Both the database config and the secret key for bcrypt are hard-coded.
> Once in production, this information should be stored in a .env file (as environment variables).
> Also, that .env file should be included in .gitignore, so nobody can see it in your repo either.
