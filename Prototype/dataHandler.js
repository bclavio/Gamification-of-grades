var dataHandler;
var corrected = [];

function DataHandler(){
	/*
	 * offline mode: debug mode which does not connect with server or require login
	 * online mode: connects with server, posts data to server and requires login
	 */
	this.mode = "offline"
	
	// Setup server connection if in online mode
	this.connector = (this.mode == "online" ? new Connector() : null);

	// Lists for holding user interaction history
	this.fullscreenHistory = [];
	this.clockHistory = [];
	this.toggleHistory = [];
	this.scrollHistory = [];
	this.clipboardHistory = [];
	this.focusHistory = [];
	this.clickDivsHistory = [];
	this.clickCanvasHistory = [];
	this.answerHistory = [];

	this.login;
	this.sessionStart;
	this.sessionEnd;
	this.begStamp;
	this.endStamp;
	this.badgeGrade;
	this.handIn;
	this.group;
}

DataHandler.prototype.fullscreen = function(e){
	// Log fullscreen event
	var arr = [Date.now(),e];
	this.fullscreenHistory.push(arr);
	if (this.connector)
		this.connector.postFullscreen(arr);
};

DataHandler.prototype.begin = function(){
	// Log test begin time
	if (!this.begStamp){
		this.begStamp = Date.now();
		if (this.connector)
			this.connector.postBegin(this.begStamp);
	}
};

DataHandler.prototype.end = function(){
	// Log test end time
	if (!this.endStamp)
		this.endStamp = Date.now();
	if (this.connector)
		this.connector.postHandIn(this.endStamp,this.handIn);
	else
		endCommence(this.group);
};

DataHandler.prototype.clipboard = function(e,data){
	// Log clipboard event
	var arr = [Date.now(),e,data];
	this.clipboardHistory.push(arr);
	if (this.connector)
		this.connector.postClipboard(arr);
};

DataHandler.prototype.session = function(e){
	// Log feedback page event
	if (e == "start"){
		this.sessionStart = Date.now();
		if (this.connector)
			this.connector.postSession([this.sessionStart,e]);
	}
	else {
		this.sessionEnd = Date.now();
		if (this.connector)
			this.connector.postSession([this.sessionEnd,e]);
	}
};

DataHandler.prototype.toggle = function(i,b){
	// Log toggle event
	var arr = [Date.now(),(i == 0 ? "correct" : "incorrect"), (b ? "show" : "hide" )];
	this.toggleHistory.push(arr);
	if (this.connector)
		this.connector.postToggle(arr);
};

DataHandler.prototype.clickCanvas = function(x,y){
	// Log canvas click event
	var arr = [Date.now(),x,y,width,height];
	this.clickCanvasHistory.push(arr);
	if (this.connector)
		this.connector.postClickCanvas(arr);
};

DataHandler.prototype.clickDiv = function(obj,i){
	// Log HTML element click event
	var arr = [Date.now(),obj,i];
	this.clickDivsHistory.push(arr);
	if (this.connector)
		this.connector.postClickDivs(arr);
};

DataHandler.prototype.focus = function(e){
	// Log input field focus event
	var arr = [Date.now(),e];
	this.focusHistory.push(arr);
	if (this.connector)
		this.connector.postFocus(arr);
};

DataHandler.prototype.clock = function(e){
	// Log clock interaction
	var arr = [Date.now(),e];
	this.clockHistory.push(arr);
	if (this.connector)
		this.connector.postClock(arr);
};

DataHandler.prototype.scroll = function(timestamp,e){
	// Log scroll event
	var arr = [timestamp,e];
	this.scrollHistory.push(arr);
	if (this.connector)
		this.connector.postScroll(arr);
};

DataHandler.prototype.answer = function(index,num){
	// Log submitted
	var event;
	answers[index] = num;
	
	if (state == 2 && answers[index] == getCorrectList()[index]){
		// Successful correction after hand-in
		event = "corrected";
		toggleAssignment();
		this.correction(index);
	}
	else if (state == 2){
		// Unsuccessful correction after hand-in
		var text = document.getElementById("text");
		text.select();
		document.getElementById("error").innerHTML = "Forkert svar";
		event = "submit";
	}
	else // Before hand-in
		event = "submit";
	
	var timestamp = Date.now();

	/** set event as "clear" if user removes a submitted answer without supplementing a new answer */
	if (this.connector)
		this.connector.postAnswer(timestamp,index,(num == null ? "clear" : event),num);
	this.answerHistory.push([timestamp,index,(num == null ? "clear" : event),num,]);
};

DataHandler.prototype.correction = function(index){
	// Update lists of answers after successful correction
	this.handIn.results[index] = -2;
	this.handIn.numCorrected++;
	
	// Move respective HTML element to list of correct answers
	var obj = document.getElementById("assign"+index);
		obj.className = "corrected";
	var ul = document.getElementsByClassName("results")[0].getElementsByTagName("ul")[0];
		ul.appendChild(obj);

	// Organize list order
	corrected[index] = obj;
	for (var i = index+1; i < corrected.length; i++)
		if (corrected[i])
			ul.appendChild(corrected[i]);
};

DataHandler.prototype.getNumCorrect = function(){
	if (this.handIn && this.handIn.numCorrect)
		return this.handIn.numCorrect;
	return 0;
};

DataHandler.prototype.getNumCorrected = function(){
	if (this.handIn && this.handIn.numCorrected)
		return this.handIn.numCorrected;
	return 0;
};

DataHandler.prototype.getGrade = function(){
	if (this.handIn){
		var num = this.getNumCorrect() + this.getNumCorrected();
		if (num < 2)
			return 0;
		if (num < 5)
			return 1;
		if (num < 8)
			return 2;
		if (num < 12)
			return 3;
		if (num < 16)
			return 4;
		if (num < 19)
			return 5;
		return 6;
	}
	return 0;
};

DataHandler.prototype.getAnswers = function(){
	/** returns cloned array to make sure manipulation of returned data does not affect stored data*/
	if (this.handIn)
		return this.handIn.answers.concat();
	return null;
};

DataHandler.prototype.getResults = function(){
	/** returns cloned array to make sure manipulation of returned data does not affect stored data*/
	if (this.handIn)
		return this.handIn.results.concat();
	return null;
};

function getCorrectList(){
	return [
			10,
			10,
			13,
			1,
			3,
			-3,
			5,
			6,
			8,
			1,
			1,
			4,
			8,
			-8,
			-12,
			8,
			4,
			1.5,
			14,
			6
		];
}

DataHandler.prototype.computeResults = function(){
	// Computes hand-in results

	var results = [];
	var numCorrect = 0;
	var grade;

	// Common error types sorted by assignment index
	var type01 = [6,16,-3,-1, "empty", "empty", 8, 2.7, 3.2, 1.2, 0, 8, "empty", 1.2, 28, "empty", -16, 11.5, 20, "empty"];
	var type02 = ["empty","empty","empty","empty", 48, -27, 20, 216, "empty", "empty", "empty", 64, 2, 0.5, 3, 4.5, 8.5, 6, "empty", 24];
	var type03 = ["empty","empty","empty","empty", "empty", "empty", 0.4, -6.5, 0, "empty", "empty", "empty", "empty", 0, -6.7, "empty", "empty", 1.1, "empty", 16];
	var type04 = ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", 2, 3, 16, 3];

	var correctAnswers = getCorrectList();

	// Validate each answer
	for(var i = 0; i < 20; i++){
		if (answers[i]){
			if (answers[i] == correctAnswers[i]){
				results[i] = 0;
				numCorrect++;
			}
			else if(answers[i] == type01[i])
				results[i] = 1;
			else if(answers[i] == type02[i])
				results[i] = 2;
			else
				results[i] = -1;
		}
		else
			results[i] = -1;
	}

	// Compute grade from number of correct answers
	if (numCorrect < 2)
		grade = -3;
	else if (numCorrect < 5)
		grade = 0;
	else if (numCorrect < 8)
		grade = 2;
	else if (numCorrect < 12)
		grade = 4;
	else if (numCorrect < 16)
		grade = 7;
	else if (numCorrect < 19)
		grade = 10;
	else
		grade = 12;
	
	if (!this.badgeGrade)
		this.badgeGrade = grade;

	// Store data in HandIn object
	this.handIn = new HandIn(numCorrect,grade,answers.concat(),results);

	// Log hand-in time
	this.end();
};

function HandIn(numCorrect,grade,answers,results){
	this.numCorrect = numCorrect;
	this.numCorrected = 0;
	this.grade = grade;
	this.answers = answers;
	this.results = results;
}
