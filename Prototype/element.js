var elements = [];

function clearElements(){
	// Removes all elements from the list
	while (elements.length > 0)
		elements[0].remove();
}

function Element(x,y,width,height,obj){
	/** Element objects represent elements on the canvas which can be interacted with using the mouse */
	this.x = x;
	this.y = y;
    this.width = width; 
    this.height = height; 
	
	// Represented object
	this.obj = obj;
	
	// Places this at the beginning of the list
	elements.unshift(this);
}

Element.prototype.remove = function(){
	// Removes itself from the list
	for (var i = 0; i < elements.length; i++)
		if (elements[i] == this){
			elements.splice(i,1);
			return;
		}
}

function collisionDetect(x,y,func){
	/*
	 * Detects mouse collision with an element
	 * Returns a boolean value of whether a collision was found
	 */

	/**
	  * If elements overlap, only the upper most element will be detected,
	  * so multiple collisions will never occur, and overlaying elements can
	  * be used to prevent collision detection of elements displayed behind it
	  */

	for(var i=0; i<elements.length; i++){
		// If cursor is within element space, i.e. collision with the element
		if(
		   x > elements[i].x && x < elements[i].x+elements[i].width && 
		   y > elements[i].y && y < elements[i].y+elements[i].height
		){
			if (func){
				if (func == "click" && elements[i].obj && elements[i].obj.click){
					// If mouse click and represented object has a click function, call it
					elements[i].obj.click();
				}
				else if (func == "over"){
					// If mouse over, set element as target for mouse over
					/** Some objects have graphical feedback for when set as target for mouse over */
					isOver = elements[i];
					update();
				}
			}
			return true;
		}
	}
	return false;
}
