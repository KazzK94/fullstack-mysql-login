
import { Router } from "express"
import { query } from '../services/db.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { validateCredentials, parseDuplicateEntryErrorMessage } from '../helpers/users.js'
import { allowOnlyLoggedUsers } from '../middlewares/auth.js'

const router = Router()

// Login with existing user
router.post('/login', async (req, res) => {
	// Destructure form data
	const { username, password } = req.body

	try {
		const { user, isValid } = await validateCredentials(username, password)

		// Invalid credentials: Return 401
		if (!isValid) return res.status(401).json({ message: 'Incorrect user or password.' })

		// Remove password from user object before generating JWT with user data
		delete user.password

		// Generate JWT
		// TODO: Replace the string 'SECRET_KEY' with real secret key (.env)
		const token = jwt.sign({ user }, 'SECRET_KEY', { expiresIn: '1 minute' })

		// Set cookie with the jwt token (as 'user')
		res.cookie('user', token, { httpOnly: true })

		// And respond with success
		res.json({ success: true })

	} catch (error) {
		res.status(400).json({ message: 'Error accessing DB for login. Please contact your administrator.', error })
	}
})

router.post('/logout', (req, res) => {
	res.clearCookie('user')
	res.json({ success: true })
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
			// Error: Duplicate Entry
			const errorMessage = parseDuplicateEntryErrorMessage(error.message)
			// And respond with it (return to exit function)
			return res.status(400).json({ message: errorMessage })
		}
		// Unknown/uncontrolled error...
		res.status(400).json({ message: 'Error trying to register user.' })
	}
})

router.get('/:username', allowOnlyLoggedUsers, async (req, res) => {
	const { username } = req.params
	const [user] = await query('SELECT username, avatar FROM users WHERE username = ?', [username])
	res.json({ user, success: !!user })
})

export default router
