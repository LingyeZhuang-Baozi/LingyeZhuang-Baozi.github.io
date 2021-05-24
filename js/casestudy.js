/* Max-min img. */
var img_desktop = document.querySelectorAll(".mined_desktop");
var img_mobile = document.querySelectorAll(".mined_mobile");
var img_wide = document.querySelectorAll(".mined_wide");
var img_huge = document.querySelectorAll(".mined_huge");
var modal_desktop = document.querySelector(".modal_desktop");
var modal_img_desktop = document.querySelector(".modal_img_desktop");
var modal_mobile = document.querySelector(".modal_mobile");
var modal_img_mobile = document.querySelector(".modal_img_mobile");
var modal_wide = document.querySelector(".modal_wide");
var modal_img_wide = document.querySelector(".modal_img_wide");
var modal_huge = document.querySelector(".modal_huge");
var modal_img_huge = document.querySelector(".modal_img_huge");
var body = document.querySelector("body");
img_desktop.forEach(item => {
	item.addEventListener('click', event => {  // open modal img
		modal_img_desktop.src = item.src;
		modal_desktop.style.display = "block";
		body.classList.add("avoid_swipe");  // avoid swiping back
	})
});
modal_desktop.addEventListener('click', () => {  // minimize img
	modal_desktop.style.display = "none";
	body.classList.remove("avoid_swipe");
});
img_mobile.forEach(item => {
	item.addEventListener('click', event => {
		modal_img_mobile.src = item.src;
		modal_mobile.style.display = "block";
		body.classList.add("avoid_swipe");
	})
});
modal_mobile.addEventListener('click', () => {
	modal_mobile.style.display = "none";
	body.classList.remove("avoid_swipe");
});
img_wide.forEach(item => {
	item.addEventListener('click', event => {
		modal_img_wide.src = item.src;
		modal_wide.style.display = "block";
		body.classList.add("avoid_swipe");
	})
});
modal_wide.addEventListener('click', () => {
	modal_wide.style.display = "none";
	body.classList.remove("avoid_swipe");
});
img_huge.forEach(item => {
	item.addEventListener('click', event => {
		modal_img_huge.src = item.src;
		modal_huge.style.display = "block";
		body.classList.add("avoid_swipe");
	})
});
modal_huge.addEventListener('click', () => {
	modal_huge.style.display = "none";
	body.classList.remove("avoid_swipe");
});

/* Nav menu and bottom overscroll. */
var scrollPos = (document.body.getBoundingClientRect()).top;;  // Initial state
var navbar = document.querySelector(".home_nav");
var body_div = document.querySelector("body");
window.addEventListener('scroll', function(){
	if ((document.body.getBoundingClientRect()).top > (scrollPos+20) /*&& window.scrollY > 0*/ ) {  // scroll up
		navbar.classList.add("home_nav_down");
	} else if ((document.body.getBoundingClientRect()).top < scrollPos) {  // scroll down
		navbar.classList.remove("home_nav_down");
	}
	if ((document.body.getBoundingClientRect()).top >= scrollPos) {  // scroll up
		body.classList.remove("bottom_bounce");
	} else {  // scroll down
		body.classList.add("bottom_bounce");
	}
	scrollPos = (document.body.getBoundingClientRect()).top;  // save the new position for iteration
});