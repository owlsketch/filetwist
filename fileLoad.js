//http://robertnyman.com/html5/fileapi-upload/fileapi-upload.html
//http://www.html5rocks.com/en/tutorials/file/dndfiles/
(function() {
	var files_uploaded = document.getElementById("files_uploaded");	
	var drop_area = document.getElementById("drop_area");

	function uploadFiles(file) {
		//if browser supports FileReader and regex test for file.type exists
		if(typeof FileReader !== "undefined" /*&& (/image/i).test(file.type)*/ ) {
			var img = document.createElement("img");

			var reader = new FileReader();
			reader.onload = (function(a_file) {
				return function(e) {
					img.src = e.target.result;
					console.log(img.width);
					console.log(img.height);
				};
			}(file));
			reader.readAsDataURL(file);
			drop_area.appendChild(img);

		}
	};

	function traverseFiles(files) {
		if(typeof files !== undefined) {
			//traverse through all our files
			for(var i = 0; i < files.length; i++) {
				uploadFiles(files[i]);
				console.log(files[i].name);
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
