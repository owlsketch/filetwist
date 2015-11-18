var setupDragging = function(container) {
	interact(container)
	.draggable({
		enabled: true,
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		// enable autoScroll
		autoScroll: true,
		// call this function on every dragmove event
		onmove: dragMoveListener,
	});

	/*
	if(presentAction !== 'transform') { 
		interact(container).draggable({enabled: true});	
	}
	else {
		interact(container).draggable({enabled: false});	
	}
	*/

	function dragMoveListener (event) {
		var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;


		// translate the element
		target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
		target.classList.remove("containerGrouped");	
	}
};
