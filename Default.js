var allFiles = [];
var currentIndex = 0;

function storeFiles(file){
	allFiles[currentIndex] = file;
	currentIndex++;
}

//if an image is removed, need to move items down
//array to fill empty index spot

function handleFileSelect(selection) {
    var files = selection.target.files; 
	
	//goes through list of chosen files
    for (var i = 0, f; f = files[i]; i++) {
	    storeFiles(f);
		if (!f.type.match('image.*')) {
			var extension = f.name.split('.')[1];
			if(extension == "pdf"){
				console.log("yay");
			}
			else if(extension == "webm"|| extension == "mkv" || extension == "mp4"){
				var reader = new FileReader();

				reader.onload = (function(theFile) {
					return function(e) {
						//prints images in divs with specific format
						var div = document.createElement('div');
						div.setAttribute("width", "1px");
						div.setAttribute("height","1px");
						div.innerHTML = ['<video class="webms" src="', e.target.result, '" title="Video" controls></video>'].join('');
						document.getElementById('container').insertBefore(div, null);
					};
				})(f);

				reader.readAsDataURL(f);
			}
		}

		else {
			var reader = new FileReader();

			reader.onload = (function(theFile) {

				return function(e) {
					//prints images in divs with specific format
					var div = document.createElement('div');
					div.setAttribute("width", "1px");
					div.setAttribute("height","1px");
					div.innerHTML = ['<img class="thumb" src="', e.target.result,
									'" title="', escape(theFile.name), '"/>'].join('');
					document.getElementById('container').insertBefore(div, null);
					};
			})(f);

			reader.readAsDataURL(f);
		}
	}
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
