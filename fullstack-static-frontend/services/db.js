import mysql from 'mysql2/promise'

// Create connection to db and store it to a variable
async function createConnection() {
	return await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'kazzsql',
		port: 3306
	})

	// TODO: Change param values for the connection with environment variables, like this:
	/*
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	*/
}

async function query(sqlQuery, params) {
	try {
		const db = await createConnection()
		const [rows] = await db.query(sqlQuery, params)
		await db.end()
		return rows
	} catch (error) {
		throw error
	}
}

export { query }