
export default function User(user) {

	const $userCard = document.createElement('article')

	$userCard.innerHTML = `
		<span class="pointer-emphasis" title="${user.role}">[${user.role[0].toUpperCase()}]</span> ${user.username}
	`

	return $userCard
}
