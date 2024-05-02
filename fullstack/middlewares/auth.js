
import jwt from 'jsonwebtoken'

function allowOnlyLoggedUsers(req, res, next) {
	try {
		const { token } = jwt.verify(req.cookies.user, 'SECRET_KEY')
		req.user = token
		next()
	} catch (error) {
		res.status(401).json({ message: 'Access denied.' })
	}
}

export { allowOnlyLoggedUsers }