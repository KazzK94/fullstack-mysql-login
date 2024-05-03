
import express from 'express'
import path from 'path'
import { getDirname } from '../helpers/fileConfig.js'

import { allowOnlyAdmins } from '../middlewares/pages.js'

const __dirname = getDirname(import.meta.url)

const router = express.Router()

// * These are all private routes (will render HTML files in the '/private' folder) *

// Use middleware to check if user is admin (if not, it will send 404 for our protection)
router.use(allowOnlyAdmins)

// Route '/admin'
router.get('/', (req, res) => {
	// The '__dirname' is the directory of the current module file
	res.sendFile(path.join(__dirname, '../private/admin.html'))
})

// ?  ----------------------------------------------------
// ?  -> ALL OTHER ADMIN ROUTES (website) SHOULD GO HERE |
// ? ----------------------------------------------------

// Route '/admin/:filename' (for any other file in '/private' folder)
router.get('/:filename', (req, res) => {
	const filename = req.params.filename
	res.sendFile(path.join(__dirname, '../private', filename))
})

export default router