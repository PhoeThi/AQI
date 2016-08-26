//debugger;
var item = document.thisItem;
var innov = item.getInnovator();
var id = item.getProperty("id");
var result = innov.applyMethod("AQI_Email_Sending","<id>" + id + "</id>");
return result;