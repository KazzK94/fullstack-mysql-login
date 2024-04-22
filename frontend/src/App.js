
import Router from './components/router/Router.js'

export default async function App() {

	// Get reference to root
	const $root = document.getElementById('root')

	// Empty root
	$root.innerHTML = null

	const navbarLoginAndRegister = document.getElementsByClassName('navbar-top')[0].getElementsByClassName('right-side')[0]

	// TODO: Move all this JWT logic somewhere else
	const jwt = localStorage.getItem('jwt')
	if (jwt) {
		const $logoutButton = document.createElement('button')
		$logoutButton.innerText = 'Log Out'
		$logoutButton.addEventListener('click', () => {
			localStorage.removeItem('jwt')
			window.reloadPage()
		})
		navbarLoginAndRegister.innerHTML = ''
		navbarLoginAndRegister.appendChild($logoutButton)
	}

	try {
		// And re-render root content
		$root.appendChild(await Router())
	} catch (err) {
		// This catch should happen when a component redirects to another route, hence not returning anything to Router, so Router() is undefined
		console.warn({ message: 'Render skipped. Either you have been redirected or the server is not responding.', error: err })
	}
}