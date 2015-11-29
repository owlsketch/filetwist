//http://robertnyman.com/html5/fileapi-upload/fileapi-upload.html
//http://www.html5rocks.com/en/tutorials/file/dndfiles/
	var elements = {};
	elements.file_uplodaded = document.getElementById("files_uploaded");	
	elements.drop_area = document.getElementById("drop_area");
	elements.drop_over = document.getElementById("drop_over");

	//this function creates the container and all the icons an imported file is to have
	function setupObject(object) {
			object.container = document.createElement("div");
			object.container.className = "container animated fadeIn";
			
			//controls that object.container will need
			object.moveHandle = document.createElement("div");
			object.moveHandle.className = "handle moveHandle hide";

			object.move = document.createElement("div");
			object.move.className = "move";
			object.moveIcon = document.createElement("i");
			object.moveIcon.className = "fa fa-arrows fa-fw";
			object.move.appendChild(object.moveIcon);
			object.moveHandle.appendChild(object.move);

			object.scaleHandle = document.createElement("div");
			object.scaleHandle.className = "handle scaleHandle hide";

			object.scale = document.createElement("div");
			object.scale.className = "scale scaleHandle hide";
			object.scaleIcon = document.createElement("i");
			object.scaleIcon.className = "fa fa-expand fa-fw";
			object.scale.appendChild(object.scaleIcon);
			
			object.rotateHandle = document.createElement("div");
			object.rotateHandle.className = "handle rotateHandle hide";

			object.rotate = document.createElement("div");
			object.rotate.className = "rotate rotateHandle hide";
			object.rotateIcon = document.createElement("i");
			object.rotateIcon.className = "fa fa-rotate-left fa-fw";
			object.rotate.appendChild(object.rotateIcon);

			object.deleteElement = document.createElement("div");
			object.deleteElement.className = "delete hide";
	
			//need onclick function execution to delete
			object.deleteElement.onclick = function() {
				this.parentElement.remove();
			};

			object.deleteIcon = document.createElement("i");
			object.deleteIcon.className = "fa fa-times fa-fw";
			object.deleteElement.appendChild(object.deleteIcon);
	}

	function setupImage(file, object) {
				object.img = document.createElement("img");

				var reader = new FileReader();
				reader.onload = (function(a_file) {
					return function(e) {
						object.img.onload = function() {
							//image constraints
							if(object.img.width > 416) {
								object.img.style.width = "26em";
							}
							else if(object.img.width < 100) {
								object.img.style.width = "6.25em";
							}
							else if(object.img.height > 800) {
								object.img.style.height = "50em";
							}
							else if(object.img.height < 100) {
								object.img.style.height = "6.25em";
							}
						};
						object.img.src = e.target.result;
					};
				}(file));
				reader.readAsDataURL(file);
				object.container.appendChild(object.img);
	}

	function setupVideo(file, object) {
				object.vid = document.createElement("video");

				var reader = new FileReader();
				reader.onload = (function(a_file) {
					return function(e) {
						object.vid.src = e.target.result;
						object.vid.setAttribute("controls", "controls");
						object.vid.setAttribute("loop", true);
						object.vid.setAttribute("width", "300");
					};
				}(file));
				reader.readAsDataURL(file);
				object.container.appendChild(object.vid);
	}

	function setupNotes(file, object) {
				//c code appears to ignore <> content
				//&lt, &gt instead of <, >
				object.doc = document.createElement("div");
				object.header = document.createElement("h2");

				if((/javascript/i).test(file.type) || (/x-csrc/i).test(file.type)) {
					object.par = document.createElement("code");
				}
				else {
					object.par = document.createElement("pre");
				}

				object.doc.className = "notes";

				//file title
				//create a regex that filters out file type 
				object.regex = /\.[a-zA-Z]+/i;
				object.header.innerHTML = file.name.replace(object.regex, "");

				//var end = parseInt(opt_stopByte) || file.size() - 1;
				var reader = new FileReader();
				reader.onload = (function(a_file){
					return function(e){
						object.par.className = "noteText";
						object.par.innerHTML = e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;");//.replace(/\r/g, "\n");
					};
				}(file));
	
				reader.readAsBinaryString(file);
				object.doc.appendChild(object.header);
				object.doc.appendChild(object.par);
				object.container.appendChild(object.doc);

	}

	function setupAudio(file, object) {
				object.audio = document.createElement("audio");	
				
				var reader = new FileReader();
				reader.onload = (function(a_file){
					return function(e){
						object.audio.src = e.target.result;
						object.audio.setAttribute("controls", "controls");
					};
				}(file));

				reader.readAsDataURL(file);
	
				object.container.appendChild(object.audio);
	}

	function uploadFiles(file) {
		if(typeof FileReader !== "undefined") {
			var object = {};
			setupObject(object);
			setupControls(object.container);

			if((/image/i).test(file.type)) { //if file type is image
				setupImage(file, object);
			}
			else if((/video/i).test(file.type)) {
				setupVideo(file, object);
			}
			else if((/text/i).test(file.type) || (/javascript/i).test(file.type)){ //txt
				setupNotes(file,object);
			}

			else if((/audio/i).test(file.type)) {
				setupAudio(file, object);
			}
			else {
				alert("We're sorry. We don't support this format at the moment.");
				//do nothing for now.	
				return;
			}

			object.container.appendChild(object.moveHandle);
			object.container.appendChild(object.scaleHandle);
			object.container.appendChild(object.scale);
			object.container.appendChild(object.rotateHandle);
			object.container.appendChild(object.rotate);
			object.container.appendChild(object.deleteElement);
			elements.drop_area.appendChild(object.container);
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
			if(elements.drop_area.getElementsByClassName("container").length > 0) {
				//need to ensure elements.drop_over doesn't already have the hide class
				if(elements.drop_over.className.length === 0) {
					elements.drop_over.className = "hide";
				}
			}
			else {
				elements.drop_over.className = "";
			}
		}
		else {
			alert("Unfortunately, the browser you are currently using does not support the File API that helps this web app function");
		}
	};

	elements.file_uplodaded.addEventListener("change", function() {
		//access to files through button click
		traverseFiles(this.files);
	}, false);

	elements.drop_area.addEventListener("dragleave", function(e) {
		var target = e.target; //element that set off the listener
		
		//if there was a target and it was our elements.drop_area
		if(target && target === elements.drop_area) {
			//remove its class name
			this.className = "";
		}
		//https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
		e.preventDefault();
		e.stopPropagation();
		
	}, false);

	elements.drop_area.addEventListener("dragenter", function(e) {
		this.className = "over";
		e.preventDefault();
		e.stopPropagation();
	}, false);

	elements.drop_area.addEventListener("dragover", function(e) {

		e.preventDefault();
		e.stopPropagation();
	}, false);

	elements.drop_area.addEventListener("drop", function(e) {
		//granted access to files for drag and drop
		traverseFiles(e.dataTransfer.files);
		this.className = "";
		e.preventDefault();
		e.stopPropagation();
	}, false);

