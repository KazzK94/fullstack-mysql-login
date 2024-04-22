# Before using

## Installing modules
It's important to run `npm install` (while inside `/backend`), so all dependencies get installed.
A 'node_modules' folder will be created with all the necessary dependencies and their own dependencies as well.

## Database Config
All database config is established in `/backend/services/db.js`.
You need to change the values of the object passed to `mysql.createConnection({ /* object is here */ })` so it contains your database's information.


# Disclaimers

## JWT Storage
> [!CAUTION]
> The way that the frontend side stores the JWT token (localStorage) is NOT safe.
> It has been made like that because this project's intent is purely for learning purposes.
> Once in production, it should be safely stored in a more secure way, such as http-only cookies.

> [!WARNING]
> Both the database config and the secret key for bcrypt are hard-coded.
> Once in production, this information should be stored in a .env file (as environment variables).
> Also, that .env file should be included in .gitignore, so nobody can see it in your repo either.
