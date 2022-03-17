const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		nav.classList.toggle('nav-active');

		navLinks.forEach((link, index) => {
			if (link.style.animation){
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
			}
		});

		burger.classList.toggle('toggle');
	});
}

navSlide();

const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
        nav.classList.add('active-phone')
    } else {
        nav.classList.remove('active')
        nav.classList.remove('active-phone')
    }
}