var setupControls = function(container) {
	
	function dragMoveListener (event) {
		var target = event.target,
		
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;


		// translate the element
		//target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
		target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
		target.classList.remove("containerGrouped");	
	}

	interact(container)
	.draggable({
		enabled: false,
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		restrict: {
			restriction: "parent",
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},
		autoScroll: true,

		// call this function on every dragmove event
		onmove: dragMoveListener,
	})
	.resizable( {
		preserveAspectRatio: false,
		enabled: false,
		edges: {
			top: false,
			left: false,
			bottom: '.scaleHandle',
			right: '.scaleHandle' 
		},
	})  
	.on('resizemove', function (event) {
		var target = event.target
		var x = (parseFloat(target.getAttribute('data-x')) || 0),
		y = (parseFloat(target.getAttribute('data-y')) || 0);
	
		//need to also resize the element itself!
		var targetChild = event.target.firstChild;

	    // update the element's style
		target.style.width  = event.rect.width + 'px';
		target.style.height = event.rect.height + 'px';

		targetChild.style.width  = event.rect.width + 'px';
		targetChild.style.height = event.rect.height + 'px';

		// translate when resizing from top or left edges
		x += event.deltaRect.left;
		y += event.deltaRect.top;
		
		//apply transformation to the container
		target.style.webkitTransform = target.style.transform =
			'translate(' + x + 'px,' + y + 'px)';
	  }).allowFrom('.activeA');
};
