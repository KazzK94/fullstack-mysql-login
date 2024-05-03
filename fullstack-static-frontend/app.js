
// - LIBRARIES -
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// - IMPORT ROUTES -
import usersRoutes from "./api/users.js"

// Create the app from express
const app = express()

// Static files enabled
app.use(express.static('public'))

// Middlewares
app.use(express.json()) // Enable json parsing
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser()) // Enable cookie parsing

// Routes (API)
app.use('/api/users', usersRoutes)

// Start server listening at PORT
const PORT = 3000
app.listen(PORT, function (err) {
	console.log(`Aplicación ejecutándose en: http://localhost:${PORT}`)
})
