
async function request(url, options) {

	let { method, headers, body } = options

	const jwt = localStorage.getItem('jwt')
	if (headers) {
		headers['Authorization'] = jwt
	} else {
		headers = { 'Authorization': jwt }
	}

	const res = await fetch(url, { method, headers, body })

	if (!res.ok) {
		if (res.status === 401) {
			console.error('You\'re not authorized to see this content. Redirecting to Login...')
			window.location.hash = '#login'
		} else {
			console.error('Error accessing the data.')
			window.location.hash = '#'
		}
		return
	}

	return res.json()
}

export { request }