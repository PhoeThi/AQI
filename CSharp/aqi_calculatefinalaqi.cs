//System.Diagnostics.Debugger.Break();
Innovator innov = this.getInnovator();
Aras.Server.Core.InnovatorDatabase conn = CCO.Variables.InnDatabase;
//Aras.Server.Core.InnovatorDataSet rst ;
string fdate =Convert.ToDateTime(this.getProperty("aqi_fdate")).ToString("yyyy-MM-dd");
string tdate =Convert.ToDateTime(this.getProperty("aqi_tdate")).ToString("yyyy-MM-dd");
string qry = "select convert(nvarchar(40),aqi_date,126) aqi_date,aqi_pm2p5,aqi_pm10,aqi_ozone = 0,aqi_co=0,aqi_so2 = 0,aqi_nox = 0 From aqi_dustdata where  cast(aqi_date as date) between '" +fdate+ "' and '" + tdate +"'";
Item itm =  innov.applySQL(qry);
int count = itm.getItemCount();
if(count<1)
	return itm;

	
for(int i=0;i<count;i++)
{
	var idx = itm.getItemByIndex(i);
	string aqi_datetime = idx.getProperty("aqi_date"); //Convert.ToString(Convert.ToDateTime(idx.getProperty("aqi_date")).ToString("yyyy-MM-dd h:mm tt"));
	float aqi_ozone =(float) Convert.ToDecimal(idx.getProperty("aqi_ozone"));
	float aqi_pm25 = (float)Convert.ToDecimal(idx.getProperty("aqi_pm2p5"));
	float aqi_pm10 = (float)Convert.ToDecimal(idx.getProperty("aqi_pm10"));
	float aqi_co = (float)Convert.ToDecimal(idx.getProperty("aqi_co"));
	float aqi_so2 = (float)Convert.ToDecimal(idx.getProperty("aqi_so2"));
	float aqi_no2 = (float)Convert.ToDecimal(idx.getProperty("aqi_nox"));

	var pm25 = Convert.ToString(AQIPM25(aqi_pm25));
	
	
	Item aqi_add = innov.newItem("aqi_aqi","add");
aqi_add.setProperty("aqi_datetime",aqi_datetime);
	 
	aqi_add.setProperty("aqi_ozone",Convert.ToString(aqi_ozone));
	aqi_add.setProperty("aqi_pm25",Convert.ToString(AQIPM25(aqi_pm25)));
	aqi_add.setProperty("aqi_pm10",Convert.ToString(AQIPM10(aqi_pm10)));
	aqi_add.setProperty("aqi_co",Convert.ToString(aqi_co));
	aqi_add.setProperty("aqi_so2",Convert.ToString(aqi_so2));
	aqi_add.setProperty("aqi_no2",Convert.ToString(aqi_no2));
	
	aqi_add = aqi_add.apply();
}
return itm;
}

 private float Linear(float AQIhigh,float AQIlow,float ConLigh,float ConLow,float Concentration)
 {
    float linearIp;
    float Conc= Concentration;
    linearIp=((AQIhigh - AQIlow)/(ConLigh-ConLow))*(Conc-ConLow)+AQIlow;
    return linearIp;
  }
private float AQIPM25(float Conc)
{

float c;
float AQI;
c= (float)Math.Floor(10*Conc)/10;
if (c>=0 && c<12.1)
{
	AQI=Linear(50,0,12,0,c);
}
else if (c>=12.1 && c<35.5)
{
	AQI=Linear(100,51,(float)(35.4),(float)(12.1),c);
}
else if (c>=35.5 && c<55.5)
{
	AQI=Linear(150,101,(float)55.4,(float)35.5,c);
}
else if (c>=55.5 && c<150.5)
{
	AQI=Linear(200,151,(float)150.4,(float)55.5,c);
}
else if (c>=150.5 && c<250.5)
{
	AQI=Linear(300,201,(float)250.4,(float)150.5,c);
}
else if (c>=250.5 && c<350.5)
{
	AQI=Linear(400,301,(float)350.4,(float)250.5,c);
}
else if (c>=350.5 && c<500.5)
{
	AQI=Linear(500,401,(float)500.4,(float)350.5,c);
}
else
{
	AQI= 0;
}

return AQI;
}

// * For PM10 *
private float AQIPM10(float Conc)
{
float c;
float AQI;
c=(float)Math.Floor(Conc);
if (c>=0 && c<55)
{
	AQI=Linear(50,0,54,0,c);
}
else if (c>=55 && c<155)
{
	AQI=Linear(100,51,154,55,c);
}
else if (c>=155 && c<255)
{
	AQI=Linear(150,101,254,155,c);
}
else if (c>=255 && c<355)
{
	AQI=Linear(200,151,354,255,c);
}
else if (c>=355 && c<425)
{
	AQI=Linear(300,201,424,355,c);
}
else if (c>=425 && c<505)
{
	AQI=Linear(400,301,504,425,c);
}
else if (c>=505 && c<605)
{
	AQI=Linear(500,401,604,505,c);
}
else
{
	AQI=0;
}
return AQI;

