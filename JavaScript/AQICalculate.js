//debugger;
var item = document.thisItem;
var innov = item.getInnovator();
var Concentration = top.aras.getItemProperty(document.item, 'aqi_concentration');
var aqipoll = top.aras.getItemProperty(document.item, 'aqi_polluant');
var bg_color = '#000000';
    
var aqirisk = 'None';
var aqides = top.aras.getItemProperty(document.item, 'aqi_descriptor');
if(aqipoll == 'PM2p5')
{
	document.getElementsByName("aqi_aqi").item().value= AQIPM25(Concentration);
}else if (aqipoll == 'PM10')
{
	document.getElementsByName("aqi_aqi").item().value= AQIPM10(Concentration);
}else if (aqipoll == 'CO')
{
	document.getElementsByName("aqi_aqi").item().value= AQICO(Concentration);
}else if (aqipoll == 'SO2')
{
	document.getElementsByName("aqi_aqi").item().value= AQISO224hr(Concentration);
}else if(aqipoll == 'NOx')
{
	document.getElementsByName("aqi_aqi").item().value= AQINO2(Concentration);
}else if(aqipoll == 'O3')
{
document.getElementsByName("aqi_aqi").item().value= AQIOzone8hr(Concentration);
}

function AQIPM25(Concentration)
{

var Conc=parseFloat(Concentration);
var c;
var AQI;
c=(Math.floor(10*Conc))/10;
if (c>=0 && c<12.1)
{
	AQI=Linear(50,0,12,0,c);
}
else if (c>=12.1 && c<35.5)
{
	AQI=Linear(100,51,35.4,12.1,c);
}
else if (c>=35.5 && c<55.5)
{
	AQI=Linear(150,101,55.4,35.5,c);
}
else if (c>=55.5 && c<150.5)
{
	AQI=Linear(200,151,150.4,55.5,c);
}
else if (c>=150.5 && c<250.5)
{
	AQI=Linear(300,201,250.4,150.5,c);
}
else if (c>=250.5 && c<350.5)
{
	AQI=Linear(400,301,350.4,250.5,c);
}
else if (c>=350.5 && c<500.5)
{
	AQI=Linear(500,401,500.4,350.5,c);
}
else
{
	AQI="Out of Range";
}

return AQI;
}
function AQIPM10(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=Math.floor(Conc);
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
	AQI="Out of Range";
}
return AQI;
}
//line104
function AQICO(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=(Math.floor(10*Conc))/10;
if (c>=0 && c<4.5)
{
	AQI=Linear(50,0,4.4,0,c);
}
else if (c>=4.5 && c<9.5)
{
	AQI=Linear(100,51,9.4,4.5,c);
}
else if (c>=9.5 && c<12.5)
{
	AQI=Linear(150,101,12.4,9.5,c);
}
else if (c>=12.5 && c<15.5)
{
	AQI=Linear(200,151,15.4,12.5,c);
}
else if (c>=15.5 && c<30.5)
{
	AQI=Linear(300,201,30.4,15.5,c);
}
else if (c>=30.5 && c<40.5)
{
	AQI=Linear(400,301,40.4,30.5,c);
}
else if (c>=40.5 && c<50.5)
{
	AQI=Linear(500,401,50.4,40.5,c);
}
else
{
	AQI="Out of Range";
}
return AQI;
}
//line145
function AQISO21hr(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=Math.floor(Conc);
if (c>=0 && c<36)
{
	AQI=Linear(50,0,35,0,c);
}
else if (c>=36 && c<76)
{
	AQI=Linear(100,51,75,36,c);
}
else if (c>=76 && c<186)
{
	AQI=Linear(150,101,185,76,c);
}
else if (c>=186 && c<=304)
{
	AQI=Linear(200,151,304,186,c);
}
else if (c>=304 && c<=604)
{
	AQI="SO21hr Message";
}
else
{
	AQI="Out of Range";
}
return AQI;
}
function AQISO224hr(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=Math.floor(Conc);
if (c>=0 && c<=304)
{
	AQI="SO2 24hr Message";
}

else if (c>=304 && c<605)
{
	AQI=Linear(300,201,604,305,c);
}
else if (c>=605 && c<805)
{
	AQI=Linear(400,301,804,605,c);
}
else if (c>=805 && c<=1004)
{	
	AQI=Linear(500,401,1004,805,c);
}
else
{
	AQI="Out of Range";
}
return AQI;
}

function AQIOzone8hr(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=(Math.floor(Conc))/1000;

if (c>=0 && c<0.055)
{
	AQI=Linear(50,0,0.054,0,c);
}
else if (c>=0.055 && c<0.071)
{
	AQI=Linear(100,51,0.070,0.055,c);
}
else if (c>=0.071 && c<0.086)
{
	AQI=Linear(150,101,0.085,0.071,c);
}
else if (c>=0.086 && c<0.106)
{
AQI=Linear(200,151,0.105,0.086,c);
}
else if (c>=0.106 && c<0.201)
{
	AQI=Linear(300,201,0.200,0.106,c);
}
else if (c>=0.201 && c<0.605)
{
	AQI="O3message";
}
else
{
	AQI="Out of Range";
}
return AQI;
}


function AQIOzone1hr(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=(Math.floor(Conc))/1000;
if (c>=0.125 && c<0.165)
{
	AQI=Linear(150,101,0.164,0.125,c);
}
else if (c>=0.165 && c<0.205)
{
	AQI=Linear(200,151,0.204,0.165,c);
}
else if (c>=0.205 && c<0.405)
{
	AQI=Linear(300,201,0.404,0.205,c);
}
else if (c>=0.405 && c<0.505)
{
	AQI=Linear(400,301,0.504,0.405,c);
}
else if (c>=0.505 && c<0.605)
{


	AQI=Linear(500,401,0.604,0.505,c);
}
else
{
	AQI="Out of Range";
}
return AQI;
}

function AQINO2(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=(Math.floor(Conc))/1000;
if (c>=0 && c<0.054)
{
	AQI=Linear(50,0,0.053,0,c);
}
else if (c>=0.054 && c<0.101)
{
	AQI=Linear(100,51,0.100,0.054,c);
}
else if (c>=0.101 && c<0.361)
{
	AQI=Linear(150,101,0.360,0.101,c);
}
else if (c>=0.361 && c<0.650)
{
	AQI=Linear(200,151,0.649,0.361,c);
}
else if (c>=0.650 && c<1.250)
{
	AQI=Linear(300,201,1.249,0.650,c);
}
else if (c>=1.250 && c<1.650)
{
	AQI=Linear(400,301,1.649,1.250,c);
}
else if (c>=1.650 && c<=2.049)
{
	AQI=Linear(500,401,2.049,1.650,c);
}
else
{
	AQI="Out of Range";
}
return AQI;
}
   function Linear(AQIhigh, AQIlow, ConLigh, ConLow, Concentration)
   {
    var linear;
    var Conc=parseFloat(Concentration);
    var Ip;
   Ip=((AQIhigh - AQIlow)/(ConLigh-ConLow))*(Conc-ConLow)+AQIlow;
    linear=Math.round(Ip);
    return linear;
   }

handleItemChange("aqi_aqi",document.getElementsByName("aqi_aqi").item().value);
var aqival = parseInt(document.getElementsByName("aqi_aqi").item().value);
if(aqival>0 && aqival<51)
{
	document.getElementsByName("aqi_descriptor").item().value= "Good";
	document.getElementsByName("aqi_rate").item().value= "0-50";
	document.getElementsByName("aqi_riskmsg").item().value= "None";
	DescriptorColor("#00FF7F");

}else if(aqival>50 && aqival<101)
{
	document.getElementsByName("aqi_descriptor").item().value= "Moderate";
	document.getElementsByName("aqi_rate").item().value= "51-100";
	DescriptorColor("#FFFF00");
	
	switch (aqipoll) {
		case 'pm2p5': 
			aqirisk = "Unusually sensitive people should consider reducing prolonged or heavy exertion.";
			break;
		case 'PM10':
			aqirisk = "Unusually sensitive people should consider reducing prolonged or heavy exertion.";
			break;
			case 'CO':
			aqirisk = 'None';
			break;
			case 'SO2':
			aqirisk = 'None';
			break;
			case 'NO2':
			aqirisk = 'Unusually sensitive individuals may experience respiratory symptoms.';
			break;
			case 'O3':
			aqirisk = 'Unusually sensitive individuals may experience respiratory symptoms. Unusually sensitive people should consider limiting prolonged outdoor exertion.';
			break;
	}
}else if(aqival>100 && aqival<151)
{
	document.getElementsByName("aqi_descriptor").item().value= "Unhealthy for Sensitive Groups";
	document.getElementsByName("aqi_rate").item().value= "101-150";
	DescriptorColor("#FFA500");
	switch (aqipoll) {
		case 'pm2p5': 
			aqirisk = "Increasing likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly.";
			break;
		case 'PM10':
			aqirisk = "Increasing likelihood of respiratory symptoms and aggravation of lung disease, such as asthma.";
			break;
			case 'CO':
			aqirisk = 'Increasing likelihood of reduced exercise tolerance due to increased cardiovascular symptoms, such as chest pain, in people with cardiovascular disease.';
			break;
			case 'SO2':
			aqirisk = 'Increasing likelihood of respiratory symptoms, such as chest tightness and breathing discomfort, in people with asthma.';
			break;
			case 'NO2':
			aqirisk = 'Increasing likelihood of respiratory symptoms and breathing discomfort in active children, the elderly, and people with lung disease, such as asthma.';
			break;
			case 'O3':
			aqirisk = 'Increasing likelihood of respiratory symptoms and breathing discomfort in active children and adults and people with respiratory disease, such as asthma.';
			break;
	}
}else if(aqival>150 && aqival<201)
{
	document.getElementsByName("aqi_descriptor").item().value= "Unhealthy";
	document.getElementsByName("aqi_rate").item().value= "151-200";
	DescriptorColor("#FF0000");
	switch (aqipoll) {
		case 'pm2p5': 
			aqirisk = "Increasing likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly.";
			break;
		case 'PM10':
			aqirisk = "Increasing likelihood of respiratory symptoms and aggravation of lung disease, such as asthma.";
			break;
			case 'CO':
			aqirisk = 'Increasing likelihood of reduced exercise tolerance due to increased cardiovascular symptoms, such as chest pain, in people with cardiovascular disease.';
			break;
			case 'SO2':
			aqirisk = 'Increasing likelihood of respiratory symptoms, such as chest tightness and breathing discomfort, in people with asthma.';
			break;
			case 'Increasing likelihood of respiratory symptoms and breathing discomfort in active children, the elderly, and people with lung disease, such as asthma.':
			aqirisk = '';
			break;
			case 'O3':
aqirisk = 'Increasing likelihood of respiratory symptoms and breathing discomfort in active children and adults and people with respiratory disease, such as asthma.';
			break;
	}
}else if(aqival>200 && aqival<301)
{
	document.getElementsByName("aqi_descriptor").item().value= "Very Unhealthy";
	document.getElementsByName("aqi_rate").item().value= "201-300";
	DescriptorColor("#800080");
	switch (aqipoll) {
		case 'pm2p5': 
			aqirisk = "Significant aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; significant increase in respiratory effects in general population.";
			break;
		case 'PM10':
			aqirisk = "Significant increase in respiratory symptoms and aggravation of lung disease, such as asthma; increasing likelihood of respiratory effects in general population.";
			break;
			case 'CO':
                      aqirisk ='Significant aggravation of cardiovascular symptoms, such as chest pain, in people with cardiovascular disease.';
			break;
			case 'SO2':
			aqirisk = 'Significant increase in respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; aggravation of heart or lung disease.';
			break;
			case 'NO2':
			aqirisk = 'Increasingly severe symptoms and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasing likelihood of respiratory effects in general population.';
			break;
			case 'O3':
			aqirisk = 'Increasingly severe symptoms and impaired breathing likely in active children and adults and people with respiratory disease, such as asthma; increasing likelihood of respiratory effects in general population.';
			break;
	}
}else if(aqival>300 && aqival<401)
{
	document.getElementsByName("aqi_descriptor").item().value= "Hazardous";
	document.getElementsByName("aqi_rate").item().value= "301-400";
	DescriptorColor("#800000");
	switch (aqipoll) {
		case 'pm2p5': 
			aqirisk = "Serious aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; serious risk of respiratory effects in general population.";
			break;
		case 'PM10':
			aqirisk = "Serious risk of respiratory symptoms and aggravation of lung disease, such as asthma; respiratory effects likely in general population.";
			break;
			case 'CO':
			aqirisk = 'Serious aggravation of cardiovascular symptoms, such as chest pain, in people with cardiovascular disease; impairment of strenuous activities in general population.';
			break;
			case 'SO2':
			aqirisk = 'Severe respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; increased aggravation of heart or lung disease; possible respiratory effects in general population.';
			break;
			case 'NO2':
			aqirisk = 'Severe respiratory effects and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasingly severe respiratory effects likely in general population.';
			break;
			case 'O3':
			aqirisk = 'Severe respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; increased aggravation of heart or lung disease; possible respiratory effects in general population.';
			break;
	}
}else if(aqival>400 && aqival<501)
{
	document.getElementsByName("aqi_descriptor").item().value= "Very Hazardous";
	document.getElementsByName("aqi_rate").item().value= "401-500";
	DescriptorColor("#800000");
		
	switch (aqipoll) {
		case 'pm2p5': 
			aqirisk = "Serious aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; serious risk of respiratory effects in general population.";
			break;
		case 'PM10':
			aqirisk = "Serious risk of respiratory symptoms and aggravation of lung disease, such as asthma; respiratory effects likely in general population.";
			break;
			case 'CO':
			aqirisk = 'Serious aggravation of cardiovascular symptoms, such as chest pain, in people with cardiovascular disease; impairment of strenuous activities in general population.';
			break;
			case 'SO2':
			aqirisk = 'Severe respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; increased aggravation of heart or lung disease; possible respiratory effects in general population.';
			break;
			case 'NO2':
			aqirisk = 'Severe respiratory effects and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasingly severe respiratory effects likely in general population.';
			break;
			case 'O3':
			aqirisk = 'Severe respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; increased aggravation of heart or lung disease; possible respiratory effects in general population.';
			break;
	}
}
handleItemChange("aqi_descriptor",document.getElementsByName("aqi_descriptor").item().value);
handleItemChange("aqi_rate",document.getElementsByName("aqi_rate").item().value);
document.getElementsByName("aqi_riskmsg").item().value= aqirisk;
handleItemChange("aqi_riskmsg",document.getElementsByName("aqi_riskmsg").item().value);

function DescriptorColor(ncolor) {
    var aqidesc = document.getElementsByName("aqi_descriptor").item();
    if (aqidesc.value === "") {
        aqidesc.style.backgroundColor = "#FFFFFF";
    }
    else{
        aqidesc.style.backgroundColor = ncolor;
//        aqidesc.innerstyle.backgroundColor = ncolor;	
        //bg_color = ncolor;
    }
}
//    var myCss = ".aqi_descriptor{ background-color: " + bg_color + " }";
//    var descriptor = item.getProperty("aqi_descriptor","");
//   if(bg_color !== "")
//   {
//	   alert(bg_color);
//     myCss = ".aqi_descriptor{ background-color: " + bg_color + "}";
//     item.setProperty("css",myCss);
//	   item = item.apply();
//   }
//
//select 
//case when AQI_PM10 <> 0 Then 1 else 0 end   + 
// case when AQI_PM_TOT <> 0 Then 1 else 0 end   +
//case when AQI_LPM <> 0 Then 1 else 0 end  +
//case when AQI_PUMP <> 0 Then 1 else 0 end  +
//case when AQI_WS <> 0 Then 1 else 0 end  From AQI_dustData 
//where 
//id = '001B2FC7BF8140E2A362AD8F4A6B057F'
