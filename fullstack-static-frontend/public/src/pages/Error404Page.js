
export default function Error404Page() {
	const $errorPage = document.createElement('section');

	$errorPage.innerHTML = '<h1>404: Page not found.</h1>'

	return $errorPage
}