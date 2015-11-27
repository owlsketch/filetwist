var setupResizing = function(container) {
	
	interact(container)
	.resizable( {
		preserveAspectRatio: false,
		edges: {
			top: false,
			left: false,
			bottom: '.scaleHandle',
			right: '.scaleHandle' 
		},
	})  
	.on('resizemove', function (event) {
		var target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0),
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

		target.style.webkitTransform = target.style.transform =
			'translate(' + x + 'px,' + y + 'px)';
		targetChild.style.webkitTransform = targetChild.style.transform =
			'translate(' + x + 'px,' + y + 'px)';
	  }).allowFrom('.scaleHandle');

};
