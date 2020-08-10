
function Connector(){
	this.user;
	this.oReq;
	this.respons;
	this.error = document.getElementById("error");
}

Connector.prototype.sendData = function(url){
	/**
	  * Posts data to the server by sending a URL request consisting of the
	  * directory to a PHP file on the server and the data being parsed
	  */
	var oReq = new XMLHttpRequest();
		oReq.open("get", url,true);
		oReq.send();
};

Connector.prototype.postAnswer = function(i,index,event,num){
	this.sendData("_answer.php?user="+this.user+"&timestamp="+i+"&index="+index+"&event="+event+"&answer="+num);
};

Connector.prototype.postBegin = function(i){
	this.sendData("_begin.php?user="+this.user+"&timestamp="+i);
};

Connector.prototype.postHandIn = function(i,handIn){
	// Posts the hand-in data to the server
	this.oReq = new XMLHttpRequest();
	
	// Listen for server feedback
	this.oReq.onload = loadComplete;
	this.oReq.addEventListener("error", error, false);
	this.oReq.addEventListener("abort", error, false);

	this.oReq.open("get", "_handin.php?user="+this.user+"&timestamp="+i+"&grade="+handIn.grade+"&answers="+arrayToStr(handIn.answers)+"&results="+arrayToStr(handIn.results)+"&qualitative="+qualitative,true);
	this.oReq.send();
};

function arrayToStr(arr){
	// Converts a list of answers or results into a single String
	var arr = arr.concat();
	for (var i = 0; i < 20; i++)
		if (!arr[i] && arr[i] != 0)
			arr[i] = "N";

	return arr.join(",");
}

function strToArray(str) {
	// Converts a String converted Array back into an Array
	return str.split(";");
}

Connector.prototype.postClickCanvas = function(arr){
	this.sendData("_clickCanvas.php?user="+this.user+"&timestamp="+arr[0]+"&x="+arr[1]+"&y="+arr[2]+"&width="+arr[3]+"&height="+arr[4]);
};

Connector.prototype.postClickDivs = function(arr){
	this.sendData("_clickDiv.php?user="+this.user+"&timestamp="+arr[0]+"&object="+arr[1]+"&index="+arr[2]);
};

Connector.prototype.postSession = function(arr){
	this.sendData("_session.php?user="+this.user+"&timestamp="+arr[0]+"&event="+arr[1]);
};

Connector.prototype.postFocus = function(arr){
	this.sendData("_focus.php?user="+this.user+"&timestamp="+arr[0]+"&event="+arr[1]);
};

Connector.prototype.postClipboard = function(arr){
	this.sendData("_clipboard.php?user="+this.user+"&timestamp="+arr[0]+"&event="+arr[1]+"&clipboard="+arr[2]);
};

Connector.prototype.postFullscreen = function(arr){
	this.sendData("_fullscreen.php?user="+this.user+"&timestamp="+arr[0]+"&event="+arr[1]);
};

Connector.prototype.postScroll = function(arr){
	this.sendData("_scroll.php?user="+this.user+"&timestamp="+arr[0]+"&event="+arr[1]);
};

Connector.prototype.postToggle = function(arr){
	this.sendData("_toggle.php?user="+this.user+"&timestamp="+arr[0]+"&object="+arr[1]+"&event="+arr[2]);
};

Connector.prototype.postClock = function(arr){
	this.sendData("_clock.php?user="+this.user+"&timestamp="+arr[0]+"&event="+arr[1]);
};

Connector.prototype.initConnection = function(user){
	// User login
	// Displays error feedback if no input was given

	if (user.trim().length > 0){
		dataHandler.login = Date.now();
		this.error.innerHTML = "";
		this.oReq = new XMLHttpRequest();
		
		// Listen for server feedback
		this.oReq.onload = loadComplete;
		this.oReq.addEventListener("error", error, false);
		this.oReq.addEventListener("abort", error, false);

		this.oReq.open("get", "_user.php?user="+user+"&timestamp="+dataHandler.login,true);
		this.oReq.send();
	}
	else
		this.error.innerHTML = "Mangler bruger ID";
};

function error(evt) {
	// Connection error
	if (!dataHandler.connector.user)
		this.error.innerHTML = "Fejl ved log ind";
	else if (!dataHandler.group)
		dataHandler.end();
}

function loadComplete() {
	// Computes server feedback
	
	// Extract feedback data
	var arr = strToArray(this.responseText);

	if (!dataHandler.connector.user){
		if (arr[0] != "invalid"){
			// User ID is valid
			// Set user ID to validated user ID returned by server
			dataHandler.connector.user = arr[0];

			if (arr[1] && arr[1] != null){
				/**
				  * If additional data is returned, the user has already started the test
				  * Restore user progression from the data
				  */

				// Load test start time
				dataHandler.begStamp = arr[1];

				// Load answers
				var list = arr[2].split(",");
				for (var i = 0; i < list.length; i++){
					var num = Number(list[i]);
					if (num == num && num != 0)
						answers[i] = num;
					else
						answers[i] = null;
				}

				if (arr[3] && arr[3] != null){
					/**
					  * If further data is returned, the user has already finished the test
					  * Restore test results from the data
					  */

					// Load test end time
					dataHandler.endStamp = arr[3];
					// Load hand-in grade
					dataHandler.badgeGrade = arr[4];
				}

				// Skip information page
				start();
				inputField.style.display = "none";
				inputField.getElementsByClassName("popClose")[0].style.display = "block";

				/**
				  * For stability reasons, the system does not skip beyond the test start
				  * Rather, it starts the test and immediately realizes it has already concluded and ends the test
				  * The system then continues as it would normally
				  */
			}
			else{
				// New user
				// Display information page
				showRules();
			}
		}
		else{
			// User ID is invalid
			// Display error feedback
			dataHandler.connector.error.innerHTML = "Ugyldig bruger ID";
		}
	}

	else if (!dataHandler.group){
		/**
		  * If the system already has a user, i.e. is already logged in,
		  * this data is the responds from a hand-in call to the server
		  */
		if (arr[1]){
			// Set test group to the group distributed by the server
			dataHandler.group = arr[1];
			endCommence(dataHandler.group);
		}
		else{
			/** If arr[1] returns false, data is corrupted. Unknown error */
			error();
		}
	}}
