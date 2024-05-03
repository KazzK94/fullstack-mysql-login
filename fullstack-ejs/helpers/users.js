
import bcrypt from "bcrypt"

import { query } from '../services/db.js'

export async function validateCredentials(username, password) {
	try {
		// Get user data (only get the first user from the response, should only return one anyway)
		const [user] = await query('SELECT * FROM users WHERE username = ?', [username])
		// If user doesn't exist: return false
		if (!user) return { isValid: false }
		// If incorrect password: return false
		if (!bcrypt.compareSync(password, user.password)) return { isValid: false }
		// Valid, return true and user data
		return { isValid: true, user }
	} catch (error) {
		// Log error and return false
		console.error('Error validating credentials:', error)
		return { isValid: false }
	}
}

export function parseDuplicateEntryErrorMessage(errorMessage) {
	// Get all values between single quotes - err.message shows something like: "Duplicate entry 'something@gmail.com' for key 'email'"
	const matches = errorMessage.match(/'([^']+)'/g)
	// First one is the value (like: something@gmail.com)
	const duplicateValue = matches[0].replace(/'/g, '')
	// Second one is the "key" (like: email)
	const duplicateKey = matches[1].replace(/'/g, '')
	// Build the error message
	const parsedErrorMessage = `A user with the ${duplicateKey} '${duplicateValue}' already exists.`
	// Return the error message
	return parsedErrorMessage
}
