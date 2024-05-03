
// - LIBRARIES -
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

// - ROUTES -
// For the page
import routes from "./routes.js"
// For the API
import usersRoutes from "./api/users.js"


const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

// EJS Config
app.set('view engine', 'ejs')
app.set('views', 'views/pages')

// Static files enabled
app.use(express.static('public'))

// API Routes
app.use('/api/users', usersRoutes)

// Page Routes
app.use('/', routes)

// Start server listening at PORT
const PORT = 3000
app.listen(PORT, function () {
	console.log(`App running on: http://localhost:${PORT}`)
})
