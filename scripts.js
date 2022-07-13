const menuManager = () => {
	const topThreshold = 48;
	let atTop = (window.scrollY <= topThreshold);
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

const menuIntersection = () => {
	// tests whether the menuBar is at its static (below 40vh) or sticky (at 40vh) position

	const menuBar = document.querySelector('.menuBar');
	let currentHeight = window.innerHeight;
	let newLoad = true;

	const animation = (entries, observer) => {
		const entry = entries[0];
		if (newLoad) {
			requestAnimationFrame(() => menuBar.classList.add('instant'));
			setTimeout(() => requestAnimationFrame(() => menuBar.classList.remove('instant')), 400);
			newLoad = false;
		}
		console.log('isIntersecting:', entry.isIntersecting);
		if (entry.isIntersecting) {requestAnimationFrame(() => menuBar.classList.remove('keepOpen'))}
		else {requestAnimationFrame(() => menuBar.classList.add('keepOpen'))};
	}

	let observer;
	const setUpObserver = (prevObserver) => {
		console.log('setup observer')
		if (observer) {observer.unobserve(menuBar);}
		const options = {
			rootMargin: '0px 0px -60% 0px',
			threshold: 0
		}
		observer = new IntersectionObserver(animation, options);
		console.log(observer)
		observer.observe(menuBar);
	}

	setUpObserver();

	// recalculate observer when window size changes, once per second
	let enableCall = true;
	window.addEventListener('resize', () => {
		if (enableCall) {
			enableCall = false;
			requestAnimationFrame(() => {
				if (window.innerHeight !== currentHeight) {
					currentHeight = window.innerHeight;
					setUpObserver(observer);
				}
			})
			setTimeout(() => enableCall = true, 1000);
		}
	});
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
	// menuManager();
	menuIntersection();
	colorCoding();
}

document.addEventListener('DOMContentLoaded', loaded);