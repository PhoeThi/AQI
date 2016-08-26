//System.Diagnostics.Debugger.Break();
Innovator inno = this.getInnovator();
Item livechart = inno.applySQL("select DateName(weekday,aqi_datetime) as UpdatedDay,aqi_datetime,aqi_ozone,aqi_pm25,aqi_pm10,aqi_co,aqi_so2,aqi_no2 From AQI_AQI where AQI_DATETIME between (select MAX(AQI_DATETIME)  from AQI_AQI)-1  and (select MAX(AQI_DATETIME)  from AQI_AQI) and aqi_datetime in(select top 30 aqi_datetime from AQI_AQI order  by aqi_datetime desc) order by aqi_datetime");
return livechart;