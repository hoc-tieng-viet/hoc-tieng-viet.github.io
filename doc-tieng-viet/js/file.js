
var memoDict = {}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function startRead() {
    // obtain input element through DOM
  
    var file = document.getElementById('file').files[0];
    if(file){
      getAsText(file);
    }
  }
  
  function getAsText(readFile) {
  
    var reader = new FileReader();
  
    // Read file into memory as UTF-8
    reader.readAsText(readFile, "UTF-8");
  
    // Handle progress, success, and errors
    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;
  }
  
  function updateProgress(evt) {
    if (evt.lengthComputable) {
      // evt.loaded and evt.total are ProgressEvent properties
      var loaded = (evt.loaded / evt.total);
      if (loaded < 1) {
        // Increase the prog bar length
        // style.width = (loaded * 200) + "px";
      }
    }
  }
  
  function loaded(evt) {
    // Obtain the read file data
    let fileString = evt.target.result;
    memoDict = JSON.parse(fileString)
    // Handle UTF-16 file dump
    // if(utils.regexp.isChinese(fileString)) {
    //   //Chinese Characters + Name validation
    // }
    // else {
    //   // run other charset test
    // }
    // xhr.send(fileString)
  }
  
  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
    }
  }