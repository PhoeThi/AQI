//debugger;
var item = document.thisItem;
var innov = item.getInnovator();
var filepath = item.getProperty("aqi_filepath");

        var fileItem = innov.newItem("File", "add");
        var filename_with_extension = filepath.split(/(\\|\/)/g).pop();
  //System.IO.Path.GetFileName(filePath);
        fileItem.setProperty("filename", filename_with_extension);
        fileItem.attachPhysicalFile(filepath);
        var CheckIn = fileItem.apply();
        var fileid = CheckIn.getProperty("id");
var result = innov.applyMethod("aqi_fileimport","<aqi_filepath>" + filepath + "</aqi_filepath><id>" + fileid + "</id>");
top.onSaveUnlockAndExitCommand();
return result;