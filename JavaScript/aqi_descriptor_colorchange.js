//debugger;
var item = document.thisItem;
var innov = item.getInnovator(); 
var bg_color;
  var myCss ;
  var text_color = "#000000" ;
var aiqitem = document.getElementsByName("aqi_descriptor").item();
var aqidesc = document.getElementsByName("aqi_descriptor").item().value;
switch(aqidesc){
	case 'Good':
		bg_color = '#00FF7F';
		break;
	case 'Moderate':
		bg_color = '#FFFF00';
		break;
	case 'Unhealthy for Sensitive Groups':
		bg_color = '#FFA500';
		break;
	case 'Unhealthy':
		bg_color = '#FF0000';
		break;
		case 'Very Unhealthy':
		bg_color = '#800080';
		break;
	case 'Hazardous':
		bg_color = '#800000';
		break;
	case 'Very Hazardous':
		bg_color = '#800000';
		break;
}
if (bg_color !== "")
{
	myCss = ".aqi_descriptor { background-color: " & bg_color & " }";
//    aiqitem.getProperty("css",myCss);
}