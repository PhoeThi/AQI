//debugger;
var item = document.thisItem;
var innov = item.getInnovator();
var cntx = innov.getI18NSessionContext();
var fdate = top.aras.getItemProperty(document.item, 'aqi_fdate');
fdate = cntx.ConvertFromNeutral(fdate,"date", "short_date_time");
var tdate = top.aras.getItemProperty(document.item, 'aqi_todate');
tdate = cntx.ConvertFromNeutral(tdate,"date", "short_date_time");

var result = innov.applyMethod("aqi_calculatefinalaqi","<aqi_fdate>"+fdate+"</aqi_fdate> <aqi_tdate>" +tdate+"</aqi_tdate>"); 
top.onSaveUnlockAndExitCommand();
return result;