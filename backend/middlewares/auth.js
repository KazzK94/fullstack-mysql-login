
import jwt from 'jsonwebtoken'

function allowOnlyLoggedUsers(req, res, next) {
	const token = req.header('Authorization')
	console.log({token})
	if (!token) return res.status(401).json({ message: 'Access denied.' })
	try {
		const decodedToken = jwt.verify(token, 'SECRET_KEY')
		req.loggedUser = decodedToken
		next()
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' })
	}
}

export { allowOnlyLoggedUsers }