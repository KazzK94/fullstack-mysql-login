
import { request } from '../services/requests.js'
import User from './User.js'

export default async function Users() {

	const { users } = await request('http://localhost:3000/api/users', {
		headers: { 'Authorization': localStorage.getItem('jwt') }
	})

	const $usersPage = document.createElement('section')

	const $title = document.createElement('h1')
	$title.innerText = 'Users'
	$usersPage.appendChild($title)

	const $subtitle = document.createElement('h2')
	$subtitle.innerText = 'Users List (from DB)'
	$usersPage.appendChild($subtitle)

	const $usersList = document.createElement('div')

	// Loop through users, create new user card for each user
	users.forEach(user => $usersList.appendChild(User(user)))

	// If no users (shouldn't happen, at least YOU have to exist, as you need to be logged, lol) show this
	if (!users || users.length < 0) {
		$usersList.innerHTML = '<i>No users found...</i>'
	}

	$usersPage.appendChild($usersList)

	return $usersPage
}
