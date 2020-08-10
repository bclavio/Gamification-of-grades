function updateWidth(){
	// Get width across browsers
	canvas.width = window.innerWidth || document.documentElement.clientWidth;
	
	if (state == 2){
		// Position tree animation
		canvas.width /= 3;
		canvas.style.left = canvas.width;
		return canvas.width*3;
	}

	return canvas.width;
}

function updateHeight(){
	// Get height across browsers
	canvas.height = window.innerHeight || document.documentElement.clientHeight;
	return canvas.height;
}

function resize() {
	// Update global width and height variables
	width = updateWidth();
	height = updateHeight();

	cuiResize();
}
