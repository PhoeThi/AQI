//System.Diagnostics.Debugger.Break();
Innovator inn = this.getInnovator();
string[] arr = {"aqi_ozone","aqi_pm25","aqi_pm10","aqi_co","aqi_so2","aqi_no2"};
int ct = this.getItemCount();
if(ct<1)
	return this;
	for(int i=0 ; i<this.getItemCount();i++)
	{
		string bg_color = "#FFF";
		string colname = "";
		string text_color = "#FFF";
		Item thisItem = this.getItemByIndex(i);
		StringBuilder b=new StringBuilder();
		for(int j= 0 ;j<arr.Length;j++)
		{
		    colname = arr[j];
			string ranges = thisItem.getProperty(colname,"");
			if(ranges.Length<1)
				return this; 
			bg_color = Range(float.Parse(thisItem.getProperty(colname,"")));
			if(bg_color != "")
			{
				b.Append("." + colname + "{ background-color: " + bg_color + "; color:" + text_color + ";}");
		}
		thisItem.setProperty("css",Convert.ToString(b));
	 }
		Item itmdel = inn.applySQL("delete From aqi_aqi where aqi_DateTime is null and aqi_pm25 is null and aqi_pm10 is null");
}
return this;
}
	private string Range(float range)
	{
		string bg_color = "#FFF";
	if(range>=0 && range<51)
	{
	 bg_color="#00FF7F";
	}else if(range>50 && range<101)
	{
	 bg_color="#FFFF00";
	}else if(range>100 && range<151)
	{
		bg_color="#FFA500";
	}else if(range>150 && range<201)
	{
		bg_color="#FF0000";
	}else if(range>200 && range<301)
	{
		bg_color="#800080";
	}else if(range>300)
	{
		bg_color="#800000";
	}
return bg_color;
	
