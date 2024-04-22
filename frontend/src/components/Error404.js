
export default function Error404() {
	const $errorPage = document.createElement('section');

	$errorPage.innerHTML = '<h1>404: Page not found.</h1>'

	return $errorPage
}