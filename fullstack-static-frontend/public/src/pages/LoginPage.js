import { request } from '../services/requests.js'

export default function LoginPage() {
	const $loginPage = document.createElement('section')

	const $pageTitle = document.createElement('h1')
	$pageTitle.innerText = 'Login'
	$loginPage.appendChild($pageTitle)

	const $loginForm = document.createElement('form')
	$loginForm.classList.add('login-form')
	$loginForm.innerHTML = `
		<label for="username">Username</label>
		<input id="username" name="username" type="text" />
		<label for="password">Password</label>
		<input id="password" name="password" type="password" />
		<button>Log In</button>
	`
	$loginPage.appendChild($loginForm)

	// Handle Form Submit
	$loginForm.addEventListener('submit', handleLoginFormSubmit)

	return $loginPage
}


async function handleLoginFormSubmit(event) {
	event.preventDefault()

	const formData = new FormData(event.target)

	const user = {
		username: formData.get('username'),
		password: formData.get('password')
	}

	if (!user.username || !user.password) {
		alert('You have to fill all fields in the form.')
		return
	}

	try {
		const { token } = await request('http://localhost:3000/api/users/login', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(user)
		})
		console.log({ message: 'Login successful!', token })
		localStorage.setItem('token', token)
		window.location.hash = '#'
	} catch (error) {
		console.error({ message: 'Error logging in.', error })
		return alert(error.message)
	}

}