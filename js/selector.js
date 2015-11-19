var presentAction = {id: "", type: null}; 
var currentAction = function (action, object) {
	if(presentAction.type !== null) {
	presentAction.type.className = presentAction.type.className.replace( /(?:^|\s)active(?!\S)/g , '');
	}

	//past action
	var pastAction = presentAction.id;

	presentAction.id = action;
	presentAction.type = object;
	presentAction.type.className += " active";

	//current action
	if(presentAction.id === "transform" || presentAction.id === "move") {
		//get the move element from every container and make it visible
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var controls = containers[i].getElementsByClassName("move");
			for(var j = 0; j < controls.length; j++) {
				controls[j].classList.remove("hide");
				controls[j].className += " active";
			}
		}
	}
	else if (pastAction === "transform" || pastAction === "move") {
		//get the move element from every container and make it invisible	
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var controls = containers[i].getElementsByClassName("move");
			for(var j = 0; j < controls.length; j++) {
				controls[j].classList.remove("active");
				controls[j].className += " hide";
			}
		}
	}
}

