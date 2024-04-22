
// - LIBRARIES -
import express from 'express'
import cors from 'cors'

// - IMPORT ROUTES -
import usersRoutes from "./routes/users.js"

// Create the app from express
const app = express()

// Generic Middlewares
app.use(express.json())
app.use(cors());

// Routes
app.use('/api/users', usersRoutes)


// Start server listening at PORT
const PORT = 3000
app.listen(PORT, function (err) {
	console.log(`Aplicación ejecutándose en: http://localhost:${PORT}`)
})
