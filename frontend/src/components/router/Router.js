
import HomePage from '../../pages/HomePage.js'
import LoginPage from '../../pages/LoginPage.js'
import UsersPage from '../../pages/UsersPage.js'
import RegisterPage from '../../pages/RegisterPage.js'
import Error404Page from '../../pages/Error404Page.js'

export default async function Router() {

	const hash = window.location.hash

	if (!hash || hash === '#home') {
		return HomePage()
	}
	if (hash === '#login') {
		return LoginPage()
	}

	if (hash === '#register') {
		return RegisterPage()
	}

	if (hash === '#users') {
		return await UsersPage()
	}

	return Error404Page()

}