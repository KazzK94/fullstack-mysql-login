
export default function HomePage() {
	const $homePage = document.createElement('section');

	const $pageTitle = document.createElement('h1')
	$pageTitle.innerText = 'Home'
	$homePage.appendChild($pageTitle)

	const $content = document.createElement('div')
	$content.innerHTML = `
		<h2>List of links</h2>
		<a href="#users">Users (only available if logged)</a>
	`
	$homePage.appendChild($content)

	return $homePage
}