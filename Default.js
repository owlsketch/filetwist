
function handleFileSelections(selection) {
	var files = selection.target.files; 
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li>', escape(f.name), ' (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
   
  }
document.getElementById('files').addEventListener('change', handleFileSelect, false);