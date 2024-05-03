
import jwt from 'jsonwebtoken'

// Function to check if user is logged in and store it in req.user
export function storeLoggedUser(req, res, next) {
	try {
		// TODO: Replace the string 'SECRET_KEY' with real secret key (.env)
		const { user } = jwt.verify(req.cookies.user, 'SECRET_KEY')
		req.user = user
	} catch (error) {
		req.user = null
	}
	next()
}

export function allowOnlyLoggedUsers(req, res, next) {
	const isApi = req.originalUrl.includes('/api/')
	try {
		if (!req.user) {
			const { user } = jwt.verify(req.cookies.user, 'SECRET_KEY')
			req.user = user
		}
		next()
	} catch (error) {
		if(isApi) {
			return res.status(401).json({ message: 'Access denied' })
		}
		return res.redirect('/login')
	}
}
