var assignment;

function Assignment(index){
	this.index = index;							// Holds the index number the assignment is recognized by
	this.str = math[index];						// Holds the assignment text
	this.input = new Element(0,0,115,40,this);	// Representing canvas element
	this.answer;								// Holds latest answer
}

Assignment.prototype.submit = function(val){
	if (val){
		// Convert value to number
		var num = Number(val);
		
		/**
		  * A Number that is not a number (NaN) returns false,
		  * even when being compared to itself
		  *
		  * If the value is not a number, replace comma signs with dot signs and try again
		 */
		if(num != num)
			num = Number(val.replace(/\,/g, '.'));
		
		if(num == num){
			// Commit answer to memory
			this.answer = String(num).replace(/\./g, ',');
			// Post answer to server
			dataHandler.answer(this.index,num);
		}
		else {
			// Clears data
			dataHandler.answer(this.index,null);
			this.answer = null;
			// Post event to server
			if (dataHandler && dataHandler.connector)
				dataHandler.connector.postAnswer(index,"clear");
		}

	}
	else {
		dataHandler.answer(this.index,null);
		this.answer = null;
	}

	// Hides the input field after answer is submitted if not on the feedback page
	if (state != 2)
		toggleAssignment();

	update();
};

Assignment.prototype.click = function(){
	/**
	  * This is the function for when an assignment is clicked on the canvas
	  * When an assignment is clicked it will display the input window with related text
	  */

	assignment = this;
	
	// Displays HTML elements
	backdrop.style.opacity = 0.5;
	backdrop.style.display = "block";
	inputField.style.display = "block";

	// Update the visual content of the input field according to the assignment
	var text = document.getElementById("text");
	text.placeholder = "Indtast et tal";
	text.name = "assign"+(this.index+1);
	document.getElementById("submit").value = "Svar";
	inputField.getElementsByTagName("li")[0].innerHTML = this.index+1 + ". <span>" + this.str + "</span>";

	/**
	  * If an answer is already given, it writes the stored answer to the input field and selects it
	  * so the user can easily see what their previous answer is, and overwrite it without
	  * first having to select the text themselves
	  */
	if (this.answer == null){
		text.value = "";
		text.focus();
	}
	else{
		text.value = this.answer;
		text.select();
	}
};

function toggleList(index) {
	// Toggles the display of assignment lists on the feedback page

	// Get HTML elements in list from list index
	var list = document.getElementsByClassName("results")[0].getElementsByTagName("ul")[index].getElementsByTagName("li");

	/*
	 * Hides all elements in list if displayed
	 * and displays all elements in list if not displayed
	 */
	for (var i = 0; i <= list.length; i++){

		if(list[i].style.display == "none")
			list[i].style.display = "block";
		else
			list[i].style.display = "none";
		
		// Posts event to server
		if (i+1 == list.length && dataHandler)
			dataHandler.toggle(index,list[i].style.display != "none");
	}
}

function toggleAssignment(b) {
	// Hides the input window

	/**
	  * Aborts if mouse is not enabled, and prevents the system from
	  * hiding the window at the beginning of the test
	  */
	if (!mouseEnabled || state == 1 && page.time <= 0)
		return;
	
	
	/**
	  * If the input window is currently displaying an assignment,
	  * and the window is closed without submitting an input
	  * Post answer cancelled event to the server
	  */
	if (b && inputField.style.display != "none" && 	document.getElementById("submit").value == "Svar" && dataHandler && assignment){
		var timestamp = Date.now();
		if (dataHandler.connector)
			dataHandler.connector.postAnswer(timestamp,assignment.index,"cancel");
		dataHandler.answerHistory.push([timestamp,assignment.index,"cancel"]);
	}
	
	// Hides the window etc.
	inputField.style.display = "none";
	backdrop.style.display = "none";
	tips.style.display = "none";
}

function showAssignment(obj) {
	/** 
	  * This is the function of the assignments in the assignment lists on the feedback page
	  * If the assignment is unanswered or the answer is incorrect,
	  * display the input field for the assignment
	  */

	if (!(obj.className == "correct" || obj.className == "corrected")){
		var index = Number(obj.id.replace("assign",""));
		var result = dataHandler.getResults()[index];

		// Posts event to server
		clickDiv('assignment',index);
		
		// Create Assignment object from index
		assignment = new Assignment(index);

		// Make sure mouse is enabled
		mouseEnabled = true;
		
		// Make the input field ready to display an assignment
		var nu = document.getElementsByClassName("results")[0].getElementsByTagName("ul")[1].getElementsByTagName("li")[0];
		nu.style.zIndex = 0;
		nu.style.fontWeight = "normal";
		
		inputField.getElementsByClassName("popClose")[0].style.display = "block";
		document.getElementById("text").style.display = "inline";
		document.getElementById("submit").style.display = "inline";
		document.getElementById("error").innerHTML = "";
		
		// Write stored answer to new object
		if (answers[index] || answers[index] == 0)
			assignment.answer = answers[index];

		/** 
		  * If the result of the answer at hand-in is a common error,
		  * display hint feedback to the user
		  */
		if (result && result > 0){
			tips.style.display = "block";
			var p = tips.getElementsByTagName("p")[0];

			if(result==1)
				p.innerHTML = "Husk, når man flytter tal om på den modsatte side af lighedstegnet, så bliver plus til minus og minus til plus.";
			else if(result==2)
				p.innerHTML = "Husk, når man flytter tal om på den modsatte side af lighedstegnet, så bliver gange til divider og division til gange.";
			else if(result==3)
				p.innerHTML = "Husk, man skal altid gange, før man ligger til eller trækker fra.";
			else
				p.innerHTML = "Husk, når der er paranteser, så skal det indeni regnes ud først."; 
		}

		// Emulate a mouse click on the canvas for the assignment
		assignment.click();

		update();
	}
}	

function gotoAssignment(obj){
	/**
	  * This is the function of the scroll buttons
	  * When a button is clicked it will redirect the user to the respective assignment
	  */

	// Get HTML element of all buttons
	var parent = obj.parentNode;
	var list = parent.getElementsByTagName('li');
	
	/**
	  * Computes assignment index from the clicked button's position in the list of elements
	  * When index is found, goes to assignment according to found index
	  */
	for (var i = 0; i < list.length; i++)
		if (list.item(i) == obj){
			page.y = (i == 0 ? 0 + page.margin : -(page.margin+10 + page.assignHeight*i));
			update();
			clickDiv('scrollbtn',i);
			break;
		}
		
}
