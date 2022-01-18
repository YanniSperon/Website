function changeGearContainerSize() {
	document.getElementById("gear-container").style.height = getWidth(document.getElementById("gear-container")) + "px";
}
function onResize() {
	changeGearContainerSize();
}

function onUnload() {
	console.log("Unloaded");
}

function onLoad() {
	changeGearContainerSize();
}

window.onresize = onResize;
window.onunload = onUnload;
window.onload = onLoad;

function getWidth(element) {
	return parseFloat(window.getComputedStyle(element).width);
}

function homeHeaderClicked() {
	//this.location.href = '#'
	this.location.reload();
}

function workHeaderClicked() {
	//this.location.href = '#'
	this.location.reload();
}

function contactHeaderClicked() {
	//this.location.href = '#'
	this.location.reload();
}

history.navigationMode = 'compatible';
