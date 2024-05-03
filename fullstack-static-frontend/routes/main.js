

import express from 'express'
import path from 'path'

import { getDirname } from '../helpers/fileConfig.js'
import { render404 } from '../middlewares/pages.js'

const __dirname = getDirname(import.meta.url)

const router = express.Router()


// Public routes handling (HTML)

/*
	You could have a more granular control of the public routes here,
	but for now we'll only have a single route to contemplate the 404 error (the real error).
*/

// Anything that doesn't have a static file or a route will fall here (404 error)
router.get('*', render404)

export default router