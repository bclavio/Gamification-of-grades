var page;
var answers = [];
var math = [
		"x-2 = 8",
		"3+x=13",
		"5=x-8",
		"6=7-x",
		"4x = 12",
		"3x = -9",
		"2x + 3 = 13",
		"6x-10=26",
		"3x+4=12+2x",
		"3x+7 = 6x+4",
		"-2x + 3=4x - 3",
		"3x = -x +16",
		"x/2 = 4",
		"2x/4 = 3 + 2x",
		"-x/-2 + 4 =10",
		"-3x/-4 = -6",
		"(10-x)/2 = 3",
		"2(5+x) = 13",
		"3(2x+1) - 5x = 17",
		"(6x - 4)/2 = 16"
	];

function Page(){
	/** Variables for drawing the Page object on the canvas */
	this.margin = 40;
	this.x;
	this.y = this.margin;
	this.height;
	this.width;
	this.assignHeight;
	this.maxWidth = 600;
	
	/** Variables used by scrolling systems for the page */
	this.prevY;
	this.scrollPrevY;
	this.scrollHeight;

	// Initiates all Assignment objects for the Page object
	this.assignmentList = [];
	for(var i=0; i < 20; i++)
		this.assignmentList[i] = new Assignment(i);

	// Sets test duration in seconds
	this.time = 20*60 - Math.floor((Date.now() - dataHandler.begStamp)/1000);
	
	// Sets a timer which triggers continuously with an interval of 1 second (1Hz)
	this.timer = setInterval(timerComplete,1000);
}

function timerComplete(){
	/**
	  * For each second that passes after the test as started,
	  * decrements time remaining (in seconds) by 1
	  *
	  * If time remaining is greater than zero, update clock
	  * according to remaining time
	  * 
	  * Else, end the test
	  */

	page.time--;
	if (page.time > 0){
		var timer = document.getElementsByClassName('timer')[0];
		var min = Math.floor(page.time/60);
		var sec = page.time%60;
		timer.getElementsByTagName('span')[0].innerHTML = min + (sec < 10 ? ":0" : ":" ) + sec;
	}
	else{
		clearInterval(page.timer);
		promptEnd();
	}
}


Page.prototype.update = function(){
	// Updates the page visuals on the canvas

	/*
	 * --------------------------
	 *	RESPONSIVE CANVAS
	 * --------------------------
	 */ 

	var assignWidth;
	var elmWidth;
	var elmHeight;
	var elmY;

	this.width = (width < 1360 ? width-80 : 1280);	

	if (this.width > this.maxWidth)
		this.width = this.maxWidth;

	this.x = (width-this.width)/2;
	
	if (width <= 760){
		/** Small elements */
		context.font = "14px 'Ubuntu Mono', Courier, monospace";
		assignWidth = 220;
		this.assignHeight = 106;
		elmWidth = 120;
		elmHeight = 26;
		elmY = 22;
		this.margin = 0;
	}
	else{
		/** Large elements */
		context.font = "20px 'Ubuntu Mono', Courier, monospace";
		assignWidth = 270;
		if (this.assignHeight == 106 && this.y > -40)
			this.y = 40;
			
		this.assignHeight = 130;
		elmWidth = 150;
		elmHeight = 40;
		elmY = 15;
		this.margin = 40;
	}

	this.height = 50*2 + this.assignHeight*20;

	if (width > 760 && height > 320){
		/** Page displayed with background and margin */
		context.fillStyle = "#3b5998";
		context.fillRect(this.x-1,this.y-1,this.width+2,this.height+2);
		context.fillStyle = "white";
		context.fillRect(this.x,this.y,this.width,this.height);
	}
	else{
		/** Page displayed as white background */
		context.fillStyle = "white";
		context.fillRect(0,0,width,height);
	}

	// Draws each assignment on the canvas
	for(var i = 0; i < this.assignmentList.length; i++){
		var assignment = this.assignmentList[i];
		var assignX = this.x + (this.width - assignWidth)/2;
		var assignY = this.y + this.margin + this.assignHeight*i + 50;

		// Draws assignment text on canvas
		context.fillStyle = "#333";
		context.fillText((i+1)+".",assignX,assignY);
		context.fillText(assignment.str,assignX+60,assignY);
		context.fillText("x =",assignX+60,assignY+40);

		// Draws interactive input box from position of representing Element object
		var elm = assignment.input;
		elm.width = elmWidth;
		elm.height = elmHeight;
		elm.x = assignX + assignWidth - elm.width;
		elm.y = assignY + elmY;
		
		/** If answer is given, displays answer in box with blue background*/
		if (assignment.answer){
			context.fillStyle = "#ddddff";
			context.fillRect(elm.x,elm.y,elm.width,elm.height);
			context.fillStyle = "#333";
			context.fillText(assignment.answer,elm.x+5,assignY+40);
		}

		/** displays blue border is mouse is over assignment box */
		context.strokeStyle = (isOver == elm ? "#3b5998" : "#333");
		context.strokeRect(elm.x,elm.y,elm.width,elm.height);

	}
};
