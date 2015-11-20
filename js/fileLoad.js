//http://robertnyman.com/html5/fileapi-upload/fileapi-upload.html
//http://www.html5rocks.com/en/tutorials/file/dndfiles/
(function() {
	var files_uploaded = document.getElementById("files_uploaded");	
	var drop_area = document.getElementById("drop_area");
	var drop_over = document.getElementById("drop_over");

	function uploadFiles(file) {
		if(typeof FileReader !== "undefined") {
			var container = document.createElement("div");
			container.className = "container animated fadeIn";

			//controls that container will need
			var move = document.createElement("div");
			move.className = "move hide";
			var moveIcon = document.createElement("i");
			moveIcon.className = "fa fa-arrows fa-fw";
			move.appendChild(moveIcon);

			var scale = document.createElement("div");
			scale.className = "scale hide";
			var scaleIcon = document.createElement("i");
			scaleIcon.className = "fa fa-expand fa-fw";
			scale.appendChild(scaleIcon);
			
			var rotate = document.createElement("div");
			rotate.className = "rotate hide";
			var rotateIcon = document.createElement("i");
			rotateIcon.className = "fa fa-rotate-left fa-fw";
			rotate.appendChild(rotateIcon);
			//need to pass container to our function to set up dragging
			setupDragging(container);
							
			if((/image/i).test(file.type)) { //if file type is image

				var img = document.createElement("img");

				var reader = new FileReader();
				reader.onload = (function(a_file) {
					return function(e) {
						img.onload = function() {
							//image constraints
							if(img.width > 416) {
								img.style.width = "26em";
							}
							else if(img.width < 100) {
								img.style.width = "6.25em";
							}
							else if(img.height > 800) {
								img.style.height = "50em";
							}
							else if(img.height < 100) {
								img.style.height = "6.25em";
							}
						};
						img.src = e.target.result;
					};
				}(file));
				reader.readAsDataURL(file);
				container.appendChild(img);
			}
			else if((/video/i).test(file.type)) {
				var vid = document.createElement("video");

				var reader = new FileReader();
				reader.onload = (function(a_file) {
					return function(e) {
						vid.src = e.target.result;
						vid.setAttribute("controls", "controls");
						vid.setAttribute("loop", true);
						vid.setAttribute("width", "300");
					};
				}(file));
				reader.readAsDataURL(file);
				container.appendChild(vid);
			}
			else if((/text/i).test(file.type)){ //txt
				var doc = document.createElement("div");
				var header = document.createElement("h2");
				var par = document.createElement("pre");

				doc.className = "notes";

				//file title
				//create a regex that filters out .txt and .pdf
				header.innerHTML = file.name;

				//var end = parseInt(opt_stopByte) || file.size() - 1;
				var reader = new FileReader();
				reader.onload = (function(a_file){
					return function(e){
						par.className = "noteText";
						par.innerHTML = e.target.result.replace(/\r/g, "\n");
					};
				}(file));
	
				reader.readAsBinaryString(file);
				doc.appendChild(header);
				doc.appendChild(par);
				container.appendChild(doc);
			}
			else {
				alert("We're sorry. We don't support this format at the moment.");
				//do nothing for now.	
				return;
			}

			container.appendChild(move);
			container.appendChild(scale);
			container.appendChild(rotate);
			drop_area.appendChild(container);
		}
	};

	function traverseFiles(files) {
		if(typeof files !== undefined) {
			//traverse through all our files
			for(var i = 0; i < files.length; i++) {
				//used to determine the offset for when absolute positioning
				uploadFiles(files[i]);
			}
			//if any images on board
			if(drop_area.getElementsByClassName("container").length > 0) {
				//need to ensure drop_over doesn't already have the hide class
				if(drop_over.className.length === 0) {
					drop_over.className = "hide";
				}
			}
			else {
				drop_over.className = "";
			}
		}
		else {
			alert("Unfortunately, the browser you are currently using does not support the File API that helps this web app function");
		}
	};

	files_uploaded.addEventListener("change", function() {
		//access to files through button click
		traverseFiles(this.files);
	}, false);

	drop_area.addEventListener("dragleave", function(e) {
		var target = e.target; //element that set off the listener
		
		//if there was a target and it was our drop_area
		if(target && target === drop_area) {
			//remove its class name
			this.className = "";
		}
		//https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
		e.preventDefault();
		e.stopPropagation();
		
	}, false);

	drop_area.addEventListener("dragenter", function(e) {
		this.className = "over";
		e.preventDefault();
		e.stopPropagation();
	}, false);

	drop_area.addEventListener("dragover", function(e) {

		e.preventDefault();
		e.stopPropagation();
	}, false);

	drop_area.addEventListener("drop", function(e) {
		//granted access to files for drag and drop
		traverseFiles(e.dataTransfer.files);
		this.className = "";
		e.preventDefault();
		e.stopPropagation();
	}, false);

})();
