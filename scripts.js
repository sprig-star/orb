const menuManager = () => {
	let atTop = (window.scrollY <= 24);
	const topThreshold = 24;
	const menuBar = document.querySelector('.menuBar');

	// on Load
	if (atTop) {
		requestAnimationFrame(() => menuBar.classList.add('keepOpen', 'instant'));
		setTimeout(() => requestAnimationFrame(() => menuBar.classList.remove('instant')), 1);
	}

	const scrollHandler = () => {
		const scrollY = window.scrollY;
		if ((scrollY > topThreshold && atTop) || (scrollY <= topThreshold && !atTop)) {
			atTop = !atTop;
			requestAnimationFrame(() => menuBar.classList.toggle('keepOpen'));
		}
	}

	document.addEventListener('scroll', scrollHandler, {passive: true});
}

const colorCoding = () => {
	const navItems = document.querySelectorAll('.menuBar a');
	console.log(navItems);
	const colorItems = document.querySelectorAll('.colorSync');
	console.log(colorItems);

	const pointerAdd = (color) => () => {
		colorItems.forEach(item =>
			requestAnimationFrame(() => item.classList.add(`cs-${color}`)));
	}
	const pointerRemove = (color) => () => {
		colorItems.forEach(item =>
			requestAnimationFrame(() => item.classList.remove(`cs-${color}`)));
	}

	navItems.forEach(item => {
		item.addEventListener('pointerenter', pointerAdd(item.attributes.dataColor.nodeValue));
		item.addEventListener('pointerout', pointerRemove(item.attributes.dataColor.nodeValue));
	})
}

const loaded = () => {
	menuManager();
	colorCoding();
}

document.addEventListener('DOMContentLoaded', loaded);