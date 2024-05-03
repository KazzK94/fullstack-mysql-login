
import { Router } from "express"
import { storeLoggedUser, allowOnlyLoggedUsers } from './middlewares/auth.js'

const router = Router()

router.use(storeLoggedUser)

router.use((req, res, next) => {
	res.locals.user = req.user
	next()
})

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Home'
	})
})

router.get('/users', allowOnlyLoggedUsers, (req, res) => {
	res.render('users', {
		title: 'Users'
	})
})

router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Login'
	})
})

router.get('/register', (req, res) => {
	res.render('register', {
		title: 'Register'
	})
})

router.get('/*', (req, res, next) => {
	res.render('404', {
		title: 'Page Not Found'
	})
})

export default router
