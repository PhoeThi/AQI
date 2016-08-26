debugger;
var myInnov = new Innovator();
var item = myInnov.newItem("aqi_report","get");
item = item.apply();
var fdate = item.getProperty('aqi_fromdate');
var tdate = item.getProperty('aqi_todate');
var polluant = item.getProperty('aqi_polluant');
var descriptor = item.getProperty('aqi_descriptorday');

var polluantArray = ["aqi_ozone","aqi_pm25","aqi_pm10","aqi_co","aqi_so2","aqi_no2"];
var aqiArray = [-1,50,100,150,200,300,400];
var polluantvalue = "";
var descriptorvalue = "";
var string = "";
for(var j = 0;j<polluantArray.length;j++)
{
    if(polluant==j+1)
    {
     for(var i = 0;i<aqiArray.length;i++)
     {  

        if(parseInt(aqiArray[descriptor])<301)
        {
        string = (descriptor==i+1)? '<'+polluantArray[j] + ' condition="between"> ' + (parseInt(aqiArray[i]) +1)  + ' and ' + aqiArray[i+1] +'</'+ polluantArray[j] +'>' : polluantvalue;
         }else{string='<'+ polluantArray[j] + ' condition="gt"> ' + aqiArray[i] +'</'+ polluantArray[j] +'>';}
         polluantvalue = string;
     }
     }else if (polluant === '0' && descriptor > 0 )
     {
       if(parseInt(aqiArray[descriptor])<301)
       {
         string = '<'+ polluantArray[j] + ' condition="between"> ' + (parseInt(aqiArray[parseInt(descriptor)-1])+1) + ' and ' + aqiArray[descriptor] +'</'+ polluantArray[j] +'>' ;
       }else{string='<'+ polluantArray[j] + ' condition="gt"> ' + aqiArray[descriptor] +'</'+ polluantArray[j] +'>';}
        polluantvalue += string;
     }  
}

function getReport()
{
	var innovator = new Innovator();
	var qryItem = innovator.newItem();
	var qry_string = '<Item type="aqi_aqi" action="get" select="aqi_datetime,aqi_ozone,aqi_pm25,aqi_pm10,aqi_co,aqi_so2,aqi_no2">';
	var condition ='<aqi_datetime condition="between">' + fdate + 'and' + tdate + '</aqi_datetime>';
	qry_string += condition + polluantvalue + '</Item>'; 
	qryItem.loadAML(qry_string);
	
	var resultItem = qryItem.apply();
	if(resultItem.isError())
	{
		alert(resultItem.getErrorDetail());
		return;
	}
	return resultItem;
}
var rpt_innov = new Innovator();
rpt_innov = getReport();
var rp = myInnov.getItemByKeyedName("Report","aqi_report");
var style = rp.getProperty("xsl_stylesheet");
var html = rpt_innov.applyStylesheet(style,"text");
//var w = window.open(html);
//w.contentWindow.print();
return html;