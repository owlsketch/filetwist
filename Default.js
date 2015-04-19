var allFiles = [];
var currentIndex = 0;

function storeFiles(file){
	allFiles[currentIndex] = file;
	currentIndex++;
}

//if an image is removed, need to move items down
//array to fill empty index spot

$("#minMax").click(function(){
    if($(this).html() == "-"){
        $(this).html("+");
    }
    else{
        $(this).html("-");
    }
    $("#doc_content").slideToggle();
});

function readDocument(startByte, stopByte, f) {
    var files = document.getElementById('files').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = f;
    var start = parseInt(startByte) || 0;
    var stop = parseInt(stopByte) || file.size - 1;

    var reader = new FileReader();
	
    reader.onloadend = function(selection) {
    if (selection.target.readyState == FileReader.DONE) { 
		var div = document.createElement('div');
//		var divTitle = document.createElement('div');
		var divContent = document.createElement('div');
//		var divMinMax = document.createElement('div');

		div.setAttribute("id", "window");
//		divTitle.setAttribute("id", "doc_title");
//		divMinMax.setAttribute("id", "minMax");
		divContent.setAttribute("id", "doc_content");
//		divMinMax.textContent = "-";
//		divTitle.appendChild(divMinMax);
//		div.appendChild(divTitle);
		
		
	//	divTitle.textContent = file.name;
		
		div.appendChild(divContent);
		divContent.innerHTML = ['<a href="', file.name, '" target="_blank" ></a>', file.name, '<p>', selection.target.result, '</p>'].join('');
		document.getElementById('container').insertBefore(div, null);
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
}

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
						div.innerHTML = ['<video class="webms" style="z-index: -1;" src="', e.target.result, '" title="Video" controls></video>'].join('');
						document.getElementById('container').insertBefore(div, null);
					};
				})(f);

				reader.readAsDataURL(f);
			}
			else if(extension == "doc"|| extension == "docx" || extension == "txt"){ //maybe txt?
				var startByte = 0; //document.getElementById('temp').getAttribute('data-startbyte');
				var endByte = 150;
				readDocument(startByte, endByte, f);
			}
			
		}
		else {
			var reader = new FileReader();

			reader.onload = (function(theFile) {

				return function(e) {
					//prints images in divs with specific format
					var div = document.createElement('div');
					div.innerHTML = ['<img class="thumb" style="z-index: -1;" src="', e.target.result,
									'" title="', escape(theFile.name), '"/>'].join('');
					document.getElementById('container').insertBefore(div, null);
					};
			})(f);

			reader.readAsDataURL(f);
		}
	}
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

