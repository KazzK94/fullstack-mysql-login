
export default function RegisterPage() {
	const $registerPage = document.createElement('section')

	const $pageTitle = document.createElement('h1')
	$pageTitle.innerText = 'Create an account'
	$registerPage.appendChild($pageTitle)

	const $registerForm = document.createElement('form')
	$registerForm.classList.add('register-form')
	$registerForm.innerHTML = `
		<label for="username">Username</label>
		<input id="username" name="username" type="text" />
		<label for="password">Password</label>
		<input id="password" name="password" type="password" />
		<label for="email">E-mail</label>
		<input id="email" name="email" type="email" />

		<button>Register</button>
	`
	$registerPage.appendChild($registerForm)

	$registerForm.addEventListener('submit', handleRegisterFormSubmit)

	return $registerPage
}


async function handleRegisterFormSubmit(event) {
	event.preventDefault()

	const formData = new FormData(event.target)

	const user = {
		username: formData.get('username'),
		password: formData.get('password'),
		email: formData.get('email')
	}

	if (!user.username || !user.password || !user.email) {
		alert('You have to fill all fields in the form.')
		return
	}

	// TODO: Do actual validations here! :D XD

	const res = await fetch('http://localhost:3000/api/users/register', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: { 'Content-Type': 'application/json' }
	})

	if (!res.ok) {
		const error = await res.json()
		console.error({ message: error.message })
		return alert(error.message)
	}

	const registeredUser = await res.json()

	alert('User registered successfully!\nYou can log in now.')
	console.log({ message: 'Register successful!', user: registeredUser })

	window.location.hash = '#login'
}