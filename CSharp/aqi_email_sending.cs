//System.Diagnostics.Debugger.Break();
string[] aqiarr = {"aqi_ozone","aqi_pm25","aqi_pm10","aqi_co","aqi_so2","aqi_no2"};
Innovator inn = this.getInnovator();
string id = this.getProperty("id");
Item aqi = inn.newItem("aqi_aqi","get");
aqi.setAttribute("select","aqi_datetime,aqi_ozone,aqi_pm25,aqi_pm10,aqi_co,aqi_so2,aqi_no2,created_by_id");
aqi.setProperty("id",id);
aqi = aqi.apply();
int ct = aqi.getItemCount();
if(ct<1)
{
	return this;
}

Item innAdm = inn.newItem("User","get");
innAdm.setAttribute("select","first_name,last_name,email");
innAdm.setProperty("login_name","admin");
innAdm = innAdm.apply();

Item toUser = inn.newItem("User","get");
toUser.setAttribute("select","email");
toUser.setID(aqi.getProperty("created_by_id"));
toUser = toUser.apply();

string fuser = innAdm.getProperty("email");
string fuserN = innAdm.getProperty("first_name")+ " " + innAdm.getProperty("last_name");
string touser = toUser.getProperty("email");
string emBody="";
for(int i = 0;i<aqiarr.Length;i++)
{
	if(float.Parse(aqi.getProperty(aqiarr[i],"0"))>400)
	{
		string Aqistr = aqiarr[i].ToUpper();
		int len = Aqistr.Length;
		int idx = Aqistr.IndexOf("_") + 1;
		string AqiCap = Aqistr.Substring(idx, (len-idx));
		if(emBody.Length>0)
			emBody += ",";
		emBody += AqiCap + "=" + aqi.getProperty(aqiarr[i]);
	}
}
if(emBody.Length<1)
	return this;
emBody += " Time on " + aqi.getProperty("aqi_datetime","").Replace("T"," ") ;
System.Net.Mail.MailAddress SendFrom = new System.Net.Mail.MailAddress(fuser,fuserN);
System.Net.Mail.MailAddress SendTo = new System.Net.Mail.MailAddress(touser);
System.Net.Mail.MailMessage aqiMsg = new System.Net.Mail.MailMessage(SendFrom,SendTo);
aqiMsg.Subject = "AQI Over and Hazardous Conditon Warning Message";
aqiMsg.Body = "AQI is Over and Hazardous Conditon " + emBody ;
CCO.Email.SetupSmtpMailServerAndSend(aqiMsg);
return this;