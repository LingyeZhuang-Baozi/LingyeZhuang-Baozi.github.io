/* Max-min img. */
var img = document.querySelectorAll(".mined_img");
console.log (img);
var modal = document.querySelector(".modal");
var modal_img = document.querySelector(".modal_img");
img.forEach(item => {
	item.addEventListener('click', event => {  // open modal img
		modal_img.src = item.src;
		modal.style.display = "block";
	})
});
modal.addEventListener('click', () => {  // minimize img
	modal.style.display = "none";
});