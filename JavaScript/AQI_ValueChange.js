//debugger;
var item = document.thisItem;
var innov = item.getInnovator();
var aqival = document.getElementsByName("aqi_aqi").item().value;
switch(true){
	case 0>aqival<51:
			alert("0-50");
	break;
		case 50>aqival<101:
			alert("51-100");
	break;
		case 100>aqival<151:
			alert("0-50");
	break;
		case 150>aqival<201:
			alert("51-100");
	break;
		case 200>aqival<301:
			alert("0-50");
	break;
		case 300>aqival<401:
			alert("51-100");
	break;
		case 401>aqival<501:
			alert("0-50");
	break;
	}