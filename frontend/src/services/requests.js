
async function request(url, options = {}) {

	let { method, headers, body } = options

	const jwt = localStorage.getItem('token')
	if (headers) {
		headers['Authorization'] = jwt
	} else {
		headers = { 'Authorization': jwt }
	}
	
	const res = await fetch(url, { method, headers, body })

	if (!res.ok) {
		if (res.status === 401) {
			throw new Error('You\'re not authorized to see this content.')
		} else {
			throw new Error('Error accessing the data.')
		}
	}

	return res.json()
}

export { request }