
import { Router } from "express"
import { query } from '../services/db.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { allowOnlyLoggedUsers } from '../middlewares/auth.js'

const router = Router()

router.get('/:username', allowOnlyLoggedUsers, async (req, res) => {
	const { username } = req.params
	const [user] = await query('SELECT username, avatar FROM users WHERE username = ?', [username])
	res.json({ user, success: !!user })
})


// Login with existing user
router.post('/login', async (req, res) => {
	// Destructure form data
	const { username, password } = req.body

	try {
		const { user, ok } = await validateCredentials(username, password)

		// Invalid credentials: Return 401
		if (!ok) return res.status(401).json({ message: 'Incorrect user or password.' })

		// Remove password from user object before generating JWT with user data
		delete user.password

		// Generate JWT
		// TODO: Replace the string 'SECRET_KEY' with real secret key (.env)
		const token = jwt.sign({ user }, 'SECRET_KEY', { expiresIn: '30 seconds' })

		// Set cookie with the jwt token (as 'user')
		res.cookie('user', token, { httpOnly: true })

		// And respond with success
		res.json({ success: true })

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
			// Error: Duplicate Entry
			const errorMessage = parseDuplicateEntryErrorMessage(error.message)
			// And respond with it (return to exit function)
			return res.status(400).json({ message: errorMessage })
		}
		// Unknown/uncontrolled error...
		res.status(400).json({ message: 'Error trying to register user.' })
	}
})


async function validateCredentials(username, password) {
	// Get user data (only get the first user from the response, should only return one anyway)
	const [user] = await query('SELECT * FROM users WHERE username = ?', [username])
	// If user doesn't exist: return false
	if (!user) return { ok: false }
	// If incorrect password: return false
	if (!bcrypt.compareSync(password, user.password)) return { ok: false }
	// Valid, return true and user data
	return { ok: true, user }
}

function parseDuplicateEntryErrorMessage(error) {
	// Get all values between single quotes - err.message shows something like: "Duplicate entry 'something@gmail.com' for key 'email'"
	const matches = error.message.match(/'([^']+)'/g)
	// First one is the value (like: something@gmail.com)
	const duplicateValue = matches[0].replace(/'/g, '')
	// Second one is the "key" (like: email)
	const duplicateKey = matches[1].replace(/'/g, '')
	// Build the error message
	const errorMessage = `Error: A user with the ${duplicateKey} '${duplicateValue}' already exists.`
	// Return the error message
	return errorMessage
}

export default router
