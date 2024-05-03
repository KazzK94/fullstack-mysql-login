
document.getElementById('loginForm').addEventListener('submit', async function (event) {
	event.preventDefault()
	const formData = new FormData(event.target)

	console.log(JSON.stringify(Object.fromEntries(formData)))

	const response = await fetch('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.fromEntries(formData))
	})

	if (response.ok) {
		window.location.href = '/'
	} else {
		const error = await response.json()
		document.getElementById('loginError').textContent = error.message
	}
})
