
import { Router } from "express"
import { query } from '../services/db.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { allowOnlyLoggedUsers } from '../middlewares/auth.js'

const router = Router()

// [TEST] --> Users List, only for logged users - (TODO: Delete, it's only for testing)
router.get('/', allowOnlyLoggedUsers, async (req, res) => {

	const results = await query('SELECT username, role FROM users WHERE role != "TESTER"')

	const users = results.map(user => {
		delete user.password
		return user
	})

	res.json({ users })
})


// Login with existing user
router.post('/login', async (req, res) => {

	// Destructure form data
	const { username, password } = req.body

	try {
		// Get user data (only get the first user from the response, should only return one anyway)
		const [user] = await query('SELECT * FROM users WHERE username = ?', [username])

		// Return and respond with error on incorrect user
		if (!user) {
			return res.status(401).json({ message: 'Incorrect user or password.' })
		}

		// Validate password
		const isPasswordCorrect = bcrypt.compareSync(password, user.password)

		// Return and respond with error on incorrect password (don't specify it was the password, for security reasons)
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: 'Incorrect user or password.' })
		}

		// Delete password from user object
		delete user.password

		// Generate JWT
		// -> TODO: Replace the string 'SECRET_KEY' with a real secret key (using environment variables)
		const token = jwt.sign({ user }, 'SECRET_KEY', { expiresIn: '7d', })

		// And respond with json containing the session token
		res.json({ token })
	} catch (error) {
		res.status(400).json({ message: 'Error accessing DB for login. Please contact your administrator.', error })
	}
})

// Register new user
router.post('/register', async (req, res) => {
	try {
		// Destructure form data
		const { username, password, email } = req.body

		// Hash the password 
		const hashedPassword = bcrypt.hashSync(password, 10)

		// Try to insert new user
		const result = await query(
			'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
			[username, hashedPassword, email]
		)
		// Return json
		res.json({ result })
	} catch (error) {
		// Handle insert error
		if (error.errno === 1062) {
			// ERROR: Duplicate Entry
			// Get all values between single quotes - err.message shows something like: "Duplicate entry 'something@gmail.com' for key 'email'"
			const matches = error.message.match(/'([^']+)'/g)
			// First one is the value (like: something@gmail.com)
			const duplicateValue = matches[0].replace(/'/g, '')
			// Second one is the "key" (like: email)
			const duplicateKey = matches[1].replace(/'/g, '')
			// Build the error message
			const errorMessage = `Error: A user with the ${duplicateKey} '${duplicateValue}' already exists.`
			// And respond with it (return to exit function)
			return res.status(400).json({ message: errorMessage })
		}
		// Unknown/uncontrolled error...
		res.status(400).json({ message: 'Error trying to register user.' })
	}
})

export default router
