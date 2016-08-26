//Debugger;
var item = document.thisItem;
var innov = item.getInnovator();
var aqip = top.aras.getItemProperty(document.item, 'aqi_polluant');

if(aqip == 'PM2p5' || aqip == 'PM10' )
{
   document.getElementsByName("aqi_unit").item().value='ug/m3';
}else if(aqip == 'CO' )
{
   document.getElementsByName("aqi_unit").item().value='ppb';
}else
{
   document.getElementsByName("aqi_unit").item().value='ppm';
}
handleItemChange("aqi_unit",document.getElementsByName("aqi_unit").item().value);

