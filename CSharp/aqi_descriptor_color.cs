//System.Diagnostics.Debugger.Break();
for(int i=0 ; i<this.getItemCount();i++)
{
	string bg_color = "#000000";
	string myCss = ".aqi_descriptor{ background-color: " + bg_color + " }";;
	//string txt_color = "#000000";
	Item thisItem = this.getItemByIndex(i);
	string descriptor = thisItem.getProperty("aqi_descriptor","");
	switch(descriptor){
		case "Good":
		bg_color="#00FF7F";
		break;
		case "Moderate":
		bg_color="#FFFF00";
		break;
		case "Unhealthy for Sensitive Groups":
		bg_color="#FFA500";
		break;
		case "Unhealthy":
		bg_color="#FF0000";
		break;
		case "Very Unhealthy":
		bg_color="#800080";
		break;
		case "Hazardous":
		bg_color="#800000";
		break;
		case "Very Hazardous":
		bg_color="#800000";
		break;
	}
	if(bg_color != "")
	{
		myCss = ".aqi_descriptor{ background-color: " + bg_color + "}";
		thisItem.setProperty("css",myCss);
		
	}
	
}
return this;