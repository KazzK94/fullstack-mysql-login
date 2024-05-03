
document.getElementById('logout').addEventListener('click', async function () {
	const response = await fetch('/api/users/logout', {
		method: 'POST'
	})

	if (response.ok) {
		window.location.href = '/login'
	} else {
		const error = await response.json()
		console.error(error)
	}
})