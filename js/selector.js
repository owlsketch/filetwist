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
	if(presentAction.id === "transform") {
		//get the move element from every container and make it visible
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var controls = containers[i].getElementsByClassName("move");
			var scale = containers[i].getElementsByClassName("scale");
			var rotate = containers[i].getElementsByClassName("rotate");
			for(var j = 0; j < controls.length; j++) {
				controls[j].classList.remove("hide");
				scale[j].classList.remove("hide");
				rotate[j].classList.remove("hide");

				controls[j].className += " active";
				scale[j].className += " active";
				rotate[j].className += " active";
			}
		}
	}
	else if (pastAction === "transform") {
		//get the move element from every container and make it invisible	
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var controls = containers[i].getElementsByClassName("move");
			var scale = containers[i].getElementsByClassName("scale");
			var rotate = containers[i].getElementsByClassName("rotate");
			for(var j = 0; j < controls.length; j++) {
				controls[j].classList.remove("active");
				scale[j].classList.remove("active");
				rotate[j].classList.remove("active");
				
				controls[j].className += " hide";
				scale[j].className += " hide";
				rotate[j].className += " hide";
			}
		}
	}

	//current action
	if(presentAction.id === "move") {
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
	else if (pastAction === "move") {
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

	//current action
	if(presentAction.id === "scale") {
		//get the move element from every container and make it visible
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var scale = containers[i].getElementsByClassName("scale");
			for(var j = 0; j < scale.length; j++) {
				scale[j].classList.remove("hide");
				scale[j].className += " active";
			}
		}
	}
	else if (pastAction === "scale") {
		//get the move element from every container and make it invisible	
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var scale = containers[i].getElementsByClassName("scale");
			for(var j = 0; j < scale.length; j++) {
				scale[j].classList.remove("active");
				scale[j].className += " hide";
			}
		}
	}

	//current action
	if(presentAction.id === "rotate") {
		//get the move element from every container and make it visible
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var rotate = containers[i].getElementsByClassName("rotate");
			for(var j = 0; j < rotate.length; j++) {
				rotate[j].classList.remove("hide");
				rotate[j].className += " active";
			}
		}
	}
	else if (pastAction === "rotate") {
		//get the move element from every container and make it invisible	
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var rotate = containers[i].getElementsByClassName("rotate");
			for(var j = 0; j < rotate.length; j++) {
				rotate[j].classList.remove("active");
				rotate[j].className += " hide";
			}
		}
	}
	
	
	//current action
	if(presentAction.id === "delete") {
		//get the move element from every container and make it visible
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var deleteList = containers[i].getElementsByClassName("delete");
			for(var j = 0; j < deleteList.length; j++) {
				deleteList[j].classList.remove("hide");
				deleteList[j].className += " active";
			}
		}
	}
	else if (pastAction === "delete") {
		//get the move element from every container and make it invisible	
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var deleteList = containers[i].getElementsByClassName("delete");
			for(var j = 0; j < deleteList.length; j++) {
				deleteList[j].classList.remove("active");
				deleteList[j].className += " hide";
			}
		}
	}
}

