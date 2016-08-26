//debugger;
document.getElementsByName("aqi_polluant").item().value= '';
document.getElementsByName("aqi_concentration").item().value= '';
document.getElementsByName("aqi_aqi").item().value= '';
document.getElementsByName("aqi_unit").item().value= '';
document.getElementsByName("aqi_descriptor").item().value= '';
document.getElementsByName("aqi_rate").item().value= '';
document.getElementsByName("aqi_riskmsg").item().value= '';

handleItemChange("aqi_polluant",document.getElementsByName("aqi_polluant").item().value);
handleItemChange("aqi_concentration",document.getElementsByName("aqi_polluant").item().value);
handleItemChange("aqi_aqi",document.getElementsByName("aqi_aqi").item().value);
handleItemChange("aqi_unit",document.getElementsByName("aqi_unit").item().value);
handleItemChange("aqi_descriptor",document.getElementsByName("aqi_descriptor").item().value);
handleItemChange("aqi_rate",document.getElementsByName("aqi_rate").item().value);
handleItemChange("aqi_riskmsg",document.getElementsByName("aqi_riskmsg").item().value);
