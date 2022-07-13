const menuManager = () => {
	var atTop = true;
	const menuBar = document.querySelector('.menuBar');

	document.addEventListener('scroll', () => {
		const scrollY = window.scrollY;
		if ((scrollY > 4 && atTop) || (scrollY <= 4 && !atTop)) {
			atTop = !atTop;
			requestAnimationFrame(() => menuBar.classList.toggle('keepOpen'));
		}
	})
}

window.addEventListener('DOMContentLoaded', menuManager);