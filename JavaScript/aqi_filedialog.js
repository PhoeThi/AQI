var item = document.thisItem;
var inn = item.getInnovator();
var filepath = top.aras.vault.SelectFile();
document.getElementsByName("aqi_filepath").item().value=filepath;
 //getFieldByName("textfilepath").value = filepath;
top.instance.handleItemChange("aqi_filepath",filepath.toString());