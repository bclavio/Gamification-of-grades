	// Create image objects for tree
	var Tree01 = new Image();
	var Tree02 = new Image();
	var Tree03 = new Image();
	var Tree04 = new Image();
	var Tree05 = new Image();
	var Tree06 = new Image();
	var Tree07 = new Image();

	var Trees = [Tree01,Tree02,Tree03,Tree04,Tree05,Tree06,Tree07];
	var grade = 0;
 
	/** create new arrays of keyframes (arrays of cuiKeyframe Objects) */
	var widthAndHeightKeys = [ /** keyframes for width and height */
		{time : 0.00,          out : -0.5, values : [125, 158]}, /** start fast */
		{time : 0.25, in :  1, out :  0.5, values : [110, 180]}, /** turn smoothly */
		{time : 0.80, in :  1, out :  1, values : [140, 136]}, /** turn smoothly */
		{time : 1.50, in :  0,           values : [125, 158]}  /** end slowly */
	];
	var growthAnimationKeys = [ /** keyframes for width and height */
		{time : 0.00,          out : -0.5, values : [125*4, 158*4]}, /** start fast */
		{time : 0.25, in :  1, out :  0.5, values : [110*4, 180*4]}, /** turn smoothly */
		{time : 0.80, in :  1, out :  1, values : [140*4, 136*4]}, /** turn smoothly */
		{time : 1.50, in :  0,           values : [125*4, 158*4]}  /** end slowly */
	];
	var xAndAngleKeys = [ /** keyframes for x coordinate and angle (in degrees) */
		new cuiKeyframe(0.00, 0, 0, [190,   0]), /** start slowly */
		new cuiKeyframe(1.00, 1, 1, [190,  -1]), /** turn smoothly */
		new cuiKeyframe(2.00, 1, 1, [190, +1]), /** turn smoothly */
		new cuiKeyframe(3.00, 0, 0, [190,   0])  /** end slowly */
	];

	// Create animation objects
	var widthAndHeightAnimation = new cuiAnimation();
	var yAnimation = new cuiAnimation();
	var xAndAngleAnimation = new cuiAnimation();
	var testAnimation = new cuiAnimation();
	var growthAnimation = new cuiAnimation();
 
	/** create a new page of size 400x300 and attach animationTree */
	var treePage = new cuiPage(400, 300, animationTree);
	
	var goidel = false;
	var turinit = false;
	var firstCall = true;

	function getTreeAnimation() {
		// Load trees images
		Tree01.src = "Tree1.png";
		Tree01.onload = cuiRepaint;
		Tree02.src = "Tree2.png";
		Tree02.onload = cuiRepaint;
		Tree03.src = "Tree3.png";
		Tree03.onload = cuiRepaint;
		Tree04.src = "Tree4.png";
		Tree04.onload = cuiRepaint;
		Tree05.src = "Tree5.png";
		Tree05.onload = cuiRepaint;
		Tree06.src = "Tree6.png";
		Tree06.onload = cuiRepaint;
		Tree07.src = "Tree7.png";
		Tree07.onload = cuiRepaint;

		/** set defaults for all pages */
		cuiBackgroundFillStyle = "#e9eaed"; 
		cuiDefaultFont = "bold 20px Helvetica, sans-serif"; 
		cuiDefaultFillStyle = "#FFFFFF";
 
		/** initialize cui2d and start with treePage */
		cuiInit(treePage);
	}
 
	function updateTree(newGrade) {
		
		if (grade <= newGrade && goidel == false){
			/** If not first call, update grade value */
			if (!firstCall)
				grade = newGrade;

			var mycall = function(){
				/** 
				  * This function is called when the growth animation stops playing
				  * If the tree does not yet represent the grade, keep growing
				  *
				  * Else stop growing and start idle animation
				  */

				if (grade < newGrade){
					grade++;
				}
				else{
					goidel = true;
					mouseEnabled = true;
				}
				
				// Update tree
				updateTree(newGrade);
			};
			
			update();
			
			// Start growth animation
			growthAnimation.play(growthAnimationKeys, 0.6, false,mycall); 
		}
		else if(goidel ==true){
			// Start playing idle animation once the tree stops growing
			xAndAngleAnimation.play(xAndAngleKeys, 0.5, true, mycall);
			
			// Display tutorial the first time the tree stops growing
			if(!turinit){
				turinit = true;
				tutorial();
			}
		}
	}
	
	/** 
	  * a function to repaint the canvas and return false (if null == event) 
	  * or to process user events (if null != event) and return true
	  * if the event has been processed
	  */

	function animationTree(event) {
		/** draw animated image */
		if (null == event) {
			var xAndAngle = [190, 0];
			if (xAndAngleAnimation.isPlaying()) {
				xAndAngle = xAndAngleAnimation.animateValues();
		}
		
        var angleTree = xAndAngle[1];
		var growth = [125*4, 158*4];

		if (growthAnimation.isPlaying())
			growth = growthAnimation.animateValues();

		var widthTree = growth[0];
		var heightTree = growth[1];

		// Responsive width
		if (widthTree > width){
			heightTree *= width/widthTree;
			widthTree = width
		}

		// Responsive height
		if (heightTree > height){
			widthTree *= height/heightTree;
			heightTree = height
		}

		// Responsive position
		var xTree = width/9+200;
		var yTree = height/3+180;
 
		cuiContext.save(); /** save current coordinate transformation */
 
		/** read the following three lines backwards, starting with the last */
		cuiContext.translate(xTree, yTree); /** translate pivot point back to original position */
		cuiContext.rotate(angleTree * Math.PI / 180.0); /** rotate around pivot point */
		cuiContext.translate(-xTree, -yTree); /** translate pivot point to origin */
 
		cuiContext.drawImage(Trees[grade], (xTree - widthTree/2), (yTree-heightTree), widthTree, heightTree);
		cuiContext.restore(); /** restore previous coordinate transformation */
	}
	return false; /** event should be further processed */
}
