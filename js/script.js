class Helpers {
	static getWidth(element) {
		return parseFloat(window.getComputedStyle(element).width);
	}
}

var gearContainer = document.getElementById("gear-container");;

function changeGearContainerSize() {
	if (!gearContainer) {
		gearContainer = document.getElementById("gear-container");
	}
	gearContainer.style.height = Helpers.getWidth(gearContainer) + "px";
}

function onLoad() {
	changeGearContainerSize();
}

function onResize() {
	changeGearContainerSize();
}

function onPageHide() {
	console.log("Unloading");
}

function onVisibilityChange() {
	console.log("Tab switch or close");
}

window.addEventListener("load", onLoad);
window.addEventListener("resize", onResize);
window.addEventListener("pagehide", onPageHide);
document.addEventListener("visibilitychange", onVisibilityChange);

history.navigationMode = 'compatible';

function handleHeaderClicked(element) {
	document.querySelectorAll('.header-element').forEach(el => el.classList.remove('selected-element'));
	element.classList.add('selected-element');
}

document.querySelectorAll(".header-element").forEach(element => {
	element.addEventListener("click", function() {
		handleHeaderClicked(element);
	});
});

