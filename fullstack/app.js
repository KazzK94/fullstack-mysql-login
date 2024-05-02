
// - LIBRARIES -
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

// - MIDDLEWARES -
import { allowOnlyLoggedUsers } from './middlewares/auth.js'

// - IMPORT ROUTES -
import usersRoutes from "./api/users.js"

// Create the app from express
const app = express()

// Generic Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// EJS Config
app.set('view engine', 'ejs')
app.set('views', 'views')

// Static files (not being used for now...)
app.use(express.static('public'))


app.get('/', allowOnlyLoggedUsers, (req, res) => {
	const jwtToken = jwt.decode(req.cookies.token)
	const { token } = jwtToken
	res.render('index', { title: 'Home', token })
	//res.json({ message: 'Hello from Express!', token: decodedToken })
})

app.get('/save', (req, res) => {
	// Get token from query params
	const token = req.query.token
	if (token) {
		// TODO: Replace the string 'SECRET_KEY' with real secret key (.env)
		const jwtToken = jwt.sign({ token }, 'SECRET_KEY', { expiresIn: '7d' })
		res.cookie('token', jwtToken, { httpOnly: true })
		res.json({ success: true, message: `Token '${token}' saved successfully`, token, jwtToken })
	} else {
		res.status(401).json({ success: false, message: 'You must provide a token via params' })
	}
})

app.get('/check/:token', (req, res) => {
	const token = req.params.token
	const jwtToken = jwt.decode(req.cookies.token)
	const { token: storedToken } = jwtToken
	if (storedToken && storedToken === token) {
		res.json({ success: true, message: 'Token is correct.', token: storedToken })
	} else {
		res.status(401).json({ success: false, message: 'Token is not correct' })
	}
})

// API Routes
app.use('/api/users', usersRoutes)

// Start server listening at PORT
const PORT = 3000
app.listen(PORT, function () {
	console.log(`App running on: http://localhost:${PORT}`)
})
