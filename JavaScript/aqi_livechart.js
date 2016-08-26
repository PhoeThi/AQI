//debugger;
var updatedday = ""; 
var innov = new Innovator();
var itm = innov.applyMethod("aqi_get_livechart");
var ct = itm.getItemCount();
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
 		  var data = new google.visualization.DataTable();
		  data.addColumn('string','Date');data.addColumn('number','OZONE');
		  data.addColumn('number','PM25');data.addColumn('number','PM10');
		  data.addColumn('number','CO');data.addColumn('number','SO2');data.addColumn('number','NO2');
		  var dataArray = [];
     for(var i = 0;i<ct;i++)
     {		 
         var idx = itm.getItemByIndex(i);
		 if (i===0)
		 {
			 updatedday = idx.getProperty("updatedday");
		 }
         dataArray.push([(idx.getProperty("aqi_datetime")).replace("T"," "),parseInt(idx.getProperty("aqi_ozone")),parseInt(idx.getProperty("aqi_pm25")) , parseInt(idx.getProperty("aqi_pm10")),parseInt(idx.getProperty("aqi_co")),parseInt(idx.getProperty("aqi_so2")),parseInt(idx.getProperty("aqi_no2"))]); 
	 }	
		  data.addRows(dataArray);
        var options = {
			title : 'Updated On ' + updatedday,
			vAxis: {title: 'AQI'},
			hAxis: {title: 'Date Time'},
			seriesType: 'bars',
			series: {5: {type: 'line'}}

        };
        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);
     
      }
