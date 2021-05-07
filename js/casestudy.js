/* Max-min img. */
var img_desktop = document.querySelectorAll(".mined_desktop");
console.log(img_desktop);
var img_mobile = document.querySelectorAll(".mined_mobile");
var modal_desktop = document.querySelector(".modal_desktop");
var modal_img_desktop = document.querySelector(".modal_img_desktop");
var modal_mobile = document.querySelector(".modal_mobile");
var modal_img_mobile = document.querySelector(".modal_img_mobile");
img_desktop.forEach(item => {
	item.addEventListener('click', event => {  // open modal img
		modal_img_desktop.src = item.src;
		modal_desktop.style.display = "block";
	})
});
modal_desktop.addEventListener('click', () => {  // minimize img
	modal_desktop.style.display = "none";
});
img_mobile.forEach(item => {
	item.addEventListener('click', event => {
		modal_img_mobile.src = item.src;
		modal_mobile.style.display = "block";
	})
});
modal_mobile.addEventListener('click', () => {  // minimize img
	modal_mobile.style.display = "none";
});