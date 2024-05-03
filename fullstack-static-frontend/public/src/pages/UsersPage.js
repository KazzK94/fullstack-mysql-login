
import { request } from '../services/requests.js'
import { User } from '../components/User.js'

export default async function UsersPage() {

	try {
		// Get users from API (will throw error if user is not logged in)
		const { users } = await request('http://localhost:3000/api/users')
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
		$usersPage.appendChild($usersList)

		return $usersPage
	} catch (error) {
		console.error(error)
		window.location.hash = '#login'
		throw error
	}
}
