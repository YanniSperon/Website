function onWindowLoad() {
	changeGearContainerSize();
}

function changeGearContainerSize() {
	document.getElementById("gearcontainer").style.height = getWidth(document.getElementById("gearcontainer")) + "px";
}

window.onresize = changeGearContainerSize;

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
