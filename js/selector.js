var presentAction = {id: "", type: null }; 
var currentAction = function (action, object) {
	if(presentAction.type !== null) {
	presentAction.type.className = presentAction.type.className.replace( /(?:^|\s)activeA(?!\S)/g , '');
	}

	//past action
	var pastAction = presentAction.id;

	presentAction.id = action;
	presentAction.type = object;

	//if present element already has another class name
	if(presentAction.type.className.length !== 0) {
		presentAction.type.className += " activeA";
	}
	else {
		presentAction.type.className = "activeA";
	}

	//how are we dealing with notes?
	if(presentAction.id === "notes") {
		
	}

	//current action
	if(presentAction.id === "transform" && pastAction !== "transform") {
		//get the move element from every container and make it visible
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			interact(containers[i]).draggable({enabled: true});
			interact(containers[i]).resizable({enabled: true});

			var move = containers[i].getElementsByClassName("moveHandle");
			var scale = containers[i].getElementsByClassName("scale");
			var rotate = containers[i].getElementsByClassName("rotate");
			for(var j = 0; j < move.length; j++) {
				move[j].classList.remove("hide");
				scale[j].classList.remove("hide");
				rotate[j].classList.remove("hide");

				if(pastAction !== "move") {
				move[j].className += " activeA";
				}
				if(pastAction !== "scale") {
				scale[j].className += " activeA";
				}
				if(pastAction !== "rotate") {
				rotate[j].className += " activeA";
				}
			}
		}
	}
	else if (pastAction === "transform" && presentAction.id !== "transform") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			interact(containers[i]).draggable({enabled: false});
			interact(containers[i]).resizable({enabled: false});

			var move = containers[i].getElementsByClassName("moveHandle");
			var scale = containers[i].getElementsByClassName("scale");
			var rotate = containers[i].getElementsByClassName("rotate");
			for(var j = 0; j < move.length; j++) {
				move[j].classList.remove("activeA");
				scale[j].classList.remove("activeA");
				rotate[j].classList.remove("activeA");
				
				move[j].className += " hide";
				scale[j].className += " hide";
				rotate[j].className += " hide";
			}
		}
	}

	/* Two States: entering move: active move handle and icon
		leaving move into anything except transform:
			remove move handle and icon
	
		Only two states since both transform and move states
		want both the handle and the icon
	*/
	if(presentAction.id === "move" && pastAction !== "move") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			interact(containers[i]).draggable({enabled: true});
			var move = containers[i].getElementsByClassName("moveHandle");
			for(var j = 0; j < move.length; j++) {
				move[j].classList.remove("hide");
				move[j].className += " activeA";
			}
		}
	}
	else if (pastAction === "move" && presentAction.id !== "transform" && presentAction.id !== "move") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			interact(containers[i]).draggable({enabled: false});
			var move = containers[i].getElementsByClassName("moveHandle");
			for(var j = 0; j < move.length; j++) {
				move[j].classList.remove("activeA");
				move[j].className += " hide";
			}
		}
	}

	/* THREE STATES: entering scale action: activate handle, and icon 
		leaving scale action to anything except transform:
			remove both handle and icon
		leaving scale action and entering transform:
			remove only handle, leave icon

		Same process for Rotate
	*/
	if(presentAction.id === "scale" && pastAction !== "scale") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			interact(containers[i]).resizable({enabled: true});
			var scale = containers[i].getElementsByClassName("scaleHandle");
			for(var j = 0; j < scale.length; j++) {
				scale[j].classList.remove("hide");
				scale[j].className += " activeA";
			}
		}
	}
	else if (pastAction === "scale" && presentAction.id !== "transform" && presentAction.id !== "scale") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			interact(containers[i]).resizable({enabled: false});
			var scale = containers[i].getElementsByClassName("scaleHandle");
			for(var j = 0; j < scale.length; j++) {
				scale[j].classList.remove("activeA");
				scale[j].className += " hide";
			}
		}
	}
	else if(pastAction === "scale" && presentAction.id === "transform") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var scale = containers[i].getElementsByClassName("handle scaleHandle");
			for(var j = 0; j < scale.length; j++) {
				scale[j].classList.remove("activeA");
				scale[j].className += " hide";
			}
		}
		
	}

	if(presentAction.id === "rotate" && pastAction !== "rotate") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var rotate = containers[i].getElementsByClassName("rotateHandle");
			for(var j = 0; j < rotate.length; j++) {
				rotate[j].classList.remove("hide");
				rotate[j].className += " activeA";
			}
		}
	}
	else if (pastAction === "rotate" && presentAction.id !== "transform" && presentAction.id !== "rotate") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var rotate = containers[i].getElementsByClassName("rotateHandle");
			for(var j = 0; j < rotate.length; j++) {
				rotate[j].classList.remove("activeA");
				rotate[j].className += " hide";
			}
		}
	}
	else if(pastAction === "rotate" && presentAction.id === "transform") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var rotate = containers[i].getElementsByClassName("handle rotateHandle");
			for(var j = 0; j < rotate.length; j++) {
				rotate[j].classList.remove("activeA");
				rotate[j].className += " hide";
			}
		}
		
	}
	
	
	if(presentAction.id === "delete" && pastAction !== "delete") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var deleteList = containers[i].getElementsByClassName("delete");
			for(var j = 0; j < deleteList.length; j++) {
				deleteList[j].classList.remove("hide");
				deleteList[j].className += " activeA";
			}
		}
	}
	else if (pastAction === "delete") {
		var containers = document.getElementsByClassName("container");
		for(var i = 0; i < containers.length; i++) {
			var deleteList = containers[i].getElementsByClassName("delete");
			for(var j = 0; j < deleteList.length; j++) {
				deleteList[j].classList.remove("activeA");
				deleteList[j].className += " hide";
			}
		}
	}
}

