
import Home from '../Home.js'
import Login from '../Login.js'
import Error404 from '../Error404.js'
import Users from '../Users.js'
import Register from '../Register.js'

export default async function Router() {

	const hash = window.location.hash

	console.log(hash)

	if (!hash || hash === '#home') {
		return Home()
	}
	if (hash === '#login') {
		return Login()
	}

	if (hash === '#register') {
		return Register()
	}

	if (hash === '#users') {
		return await Users()
	}


	return Error404()

}