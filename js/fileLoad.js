//http://robertnyman.com/html5/fileapi-upload/fileapi-upload.html
//http://www.html5rocks.com/en/tutorials/file/dndfiles/
(function() {
	var files_uploaded = document.getElementById("files_uploaded");	
	var drop_area = document.getElementById("drop_area");
	var drop_over = document.getElementById("drop_over");

	function uploadFiles(file) {
		//if browser supports FileReader
		if(typeof FileReader !== "undefined") {
			var container = document.createElement("div");
			container.className = "container animated fadeIn";
				
			//console.log(file);
			if((/image/i).test(file.type)) { //if file type is image

				var img = document.createElement("img");

				var reader = new FileReader();
				reader.onload = (function(a_file) {
					return function(e) {
						img.onload = function() {
							//constraints for upload:
							//image width or height can not be greater than half of the available area

							//need to update parent's container size
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
				drop_area.appendChild(container);
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

						/* Look into MediaAPI, onload doesn't work
						vid.onload = function() {
							if(vid.width > 416) {
								vid.style.width = "26em";
							}
							else if(vid.height > 800) {
								vid.style.height = "50em";
							}
						};
						*/
					};
				}(file));
				reader.readAsDataURL(file);
				container.appendChild(vid);
				drop_area.appendChild(container);
			}
			else if((/text/i).test(file.type)){ //pdf or word file types
				var doc = document.createElement("div");
				//var end = parseInt(opt_stopByte) || file.size() - 1;
				var reader = new FileReader();
				reader.onload = (function(a_file){
					return function(e){
						doc.className = "notes";
						doc.innerHTML = e.target.result;
					};
				}(file));

				reader.readAsBinaryString(file);
				container.appendChild(doc);
				drop_area.appendChild(container);
			}
			else {
				//do nothing for now.	
			}
		}
	};

	function traverseFiles(files) {
		if(typeof files !== undefined) {
			//traverse through all our files
			for(var i = 0; i < files.length; i++) {
				uploadFiles(files[i]);
			}
			//if any images on board
			if(drop_area.getElementsByClassName("container").length > 0) {
				drop_over.className += " hide";
			}
			else {
				drop_over.className -= " hide";
			}
		}
		else {
			console.log("No support for FILE API");	
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
