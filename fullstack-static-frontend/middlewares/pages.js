
import path from 'path'
import { getDirname } from '../helpers/fileConfig.js'

const __dirname = getDirname(import.meta.url)


// Check if user is admin, if it's not return a 404 status
export function allowOnlyAdmins(req, res, next) {
	// TODO: Make const when we remove the reassignment below
	let isAdmin = req.user && req.user.role === 'ADMIN'

	// TODO: Remove this line once admins actually exist!
	isAdmin = false

	if (!isAdmin) return render404(req, res)
	next()
}

export function render404(req, res) {
	res.status(404).sendFile(path.join(__dirname, '../public/404.html'))
}
