var presentAction = {id: "", type: null}; 
var currentAction = function (action, object) {
	
	if(presentAction.type !== null) {
	presentAction.type.className = presentAction.type.className.replace( /(?:^|\s)active(?!\S)/g , '');
	}

	presentAction.id = action;
	presentAction.type = object;
	presentAction.type.className += " active";
	
	console.log(presentAction);
}

