  function handleFileSelect(selection) {
    var files = selection.target.files; 
	
	//goes through list of chosen files
    for (var i = 0, f; f = files[i]; i++) {

      if (!f.type.match('image.*')) {
        var extension = f.name.split('.')[1];
        if(extension == "pdf"){
        console.log("yay");
        }
        else if(extension == "webm"){
            var reader = new FileReader();

            reader.onload = (function(theFile) {
            return function(e) {
			//prints images in divs with specific format
          var div = document.createElement('div');
          div.innerHTML = ['<video class="webms" src="', e.target.result, '" title="',e.target.result,'" controls></video>'].join('');
           document.getElementById('container').insertBefore(div, null);
        };
      })(f);

      reader.readAsDataURL(f);
            // <div>
            // <video class="webms" src="name.webm" title="name.webm" controls></video>
            // </div>
            //
      }
      }

      else {
      var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
			//prints images in divs with specific format
          var div = document.createElement('div');
          div.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('container').insertBefore(div, null);
        };
      })(f);

      reader.readAsDataURL(f);
    }
  }}

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

