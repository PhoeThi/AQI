//debugger;
var myInnov = new Innovator();
var item = document.thisItem;
var innov = item.getInnovator();
var PSIArray =  ["O3","PM2p5","PM10","CO","SO2","NOx"];
var result = innov.applyMethod("aqi_report_filter_clear");

var fdate = top.aras.getItemProperty(document.item,'aqi_fromdate');
var tdate = top.aras.getItemProperty(document.item,'aqi_todate');
var aqipolluant = top.aras.getItemProperty(document.item, 'aqi_polluant');
var aqipolluantindex = 0;
var aqidescriptor = 0;
aqidescriptor = top.aras.getItemProperty(document.item, 'aqi_descriptorday');
tdate = new Date((tdate.replace("T00:00:00","T24:59:59"))).toISOString().substr(0,19);
for(var i=0;i<PSIArray.length;i++)
{
	aqipolluantindex = (PSIArray[i] == aqipolluant)? i+1:aqipolluantindex;
}
var additem = myInnov.newItem("aqi_report","add");
additem.setProperty('aqi_fromdate',fdate);
additem.setProperty('aqi_todate',tdate);
additem.setProperty('aqi_polluant',aqipolluantindex);
additem.setProperty('aqi_descriptorday',aqidescriptor);
item = additem.apply();

var ProcessItem = parent.item;
var processID;
try{processID = ProcessItem.getAttribute("id");}catch(e){}
if(!processID){return;}
  ProcessItem = top.aras.getItemById("aqi_report",processID);

if(!(ProcessItem)) {return;}
var ProcessTypeID = ProcessItem.getAttribute("type");

var report = top.aras.getItemByKeyedName("Report","aqi_report");
top.aras.runReport(report,ProcessTypeID,ProcessItem);
top.onSaveUnlockAndExitCommand();

