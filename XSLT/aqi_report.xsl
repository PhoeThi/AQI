<?xml version="1.0"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:user="urn:user-scripts" xmlns:aras="http://www.aras.com" version="1.0">
		  <xsl:output method="html" omit-xml-declaration="yes" standalone="yes" indent="yes" cdata-section-elements="script msxsl:script"/>
		<xsl:template name="formatdate">
			     <xsl:param name="DateTimeStr"/>
			     <xsl:variable name="datestr">
				         <xsl:value-of select="substring-before($DateTimeStr,'T')"/>
			     </xsl:variable>
			<xsl:variable name="timestr">
				         <xsl:value-of select="substring-after($DateTimeStr,'T')"/>
			     </xsl:variable>
			     <xsl:variable name="mm">
				         <xsl:value-of select="substring($datestr,6,2)"/>
			     </xsl:variable>
			     <xsl:variable name="dd">
				        <xsl:value-of select="substring($datestr,9,2)"/>
			     </xsl:variable>
			     <xsl:variable name="yyyy">
				        <xsl:value-of select="substring($datestr,1,4)"/>
			     </xsl:variable>
			     <xsl:value-of select="concat($dd,'/', $mm, '/', $yyyy,'  ',$timestr)"/>
		  </xsl:template>
		<xsl:template name="bgcolorchange">
			<xsl:param name="aqi_values"/>
			<xsl:choose>
				        <xsl:when test="$aqi_values&gt;-1 and  $aqi_values&lt;51">
					<td style="font-family:helvetica; font-size:8pt;color:white; padding:2px; background-color:#00FF7F;">
						     <xsl:value-of select="$aqi_values"/>
					</td>
				       </xsl:when>
				                                      <xsl:when test="$aqi_values&gt;50 and  $aqi_values&lt;101">
					<td style="font-family:helvetica; font-size:8pt;color:white; padding:2px; background-color:#FFFF00;">
						     <xsl:value-of select="$aqi_values"/>
					</td>
				       </xsl:when>
				                                     <xsl:when test="$aqi_values&gt;100 and  $aqi_values&lt;151">
					<td style="font-family:helvetica; font-size:8pt;color:white; padding:2px; background-color:#FFA500;">
						     <xsl:value-of select="$aqi_values"/>
					</td>
				       </xsl:when>
				                                      <xsl:when test="$aqi_values&gt;150 and  $aqi_values&lt;201">
					<td style="font-family:helvetica; font-size:8pt;color:white; padding:2px; background-color:#FF0000;">
						     <xsl:value-of select="$aqi_values"/>
					</td>
				       </xsl:when>
				                                 <xsl:when test="$aqi_values&gt;200 and $aqi_values&lt;301">
					<td style="font-family:helvetica; font-size:8pt;color:white; padding:2px; background-color:#800080;">
						                 <xsl:value-of select="$aqi_values"/>
					</td>
				                                </xsl:when>
				                                      <xsl:when test="$aqi_values&gt;300 ">
					<td style="font-family:helvetica; font-size:8pt;color:white; padding:2px; background-color:#800000;">
						     <xsl:value-of select="$aqi_values"/>
					</td>
				       </xsl:when>
			 </xsl:choose>
		</xsl:template>
		  <xsl:template match="/">
			    <html>
				<head>
					<button onclick="myFunction('dbody')">Print</button>
				  </head>
				      <style type="text/css" userData="Global">
					.cellSolid {
					border-top:1px #000000 solid;
					border-right:1px #000000 solid;
					border-bottom:1px #000000 solid;
					border-left:1px #000000 solid;
					}
					.cellSolidTopRight {
					border-top:1px #000000 solid;
					border-right:1px #000000 solid;
					}
					.cellSolidTopLeft {
					border-top:1px #000000 solid;
					border-left:1px #000000 solid;
					}
					.cellSolidRightBottom {
					border-right:1px #000000 solid;
					border-bottom:1px #000000 solid;
					}
					.cellSolidBottomLeft {
					border-bottom:1px #000000 solid;
					border-left:1px #000000 solid;
					}
					.cellSolidTop {
					border-top:1px #000000 solid;
					}
					.cellSolidRight {
					border-right:1px #000000 solid;
					}
					.cellSolidBottom {
					border-bottom:1px #000000 solid;
					}
					.cellSolidLeft {
					border-left:1px #000000 solid;
					}
					.cellDashed {
					border-top:1px #666666 dashed;
					border-right:1px #666666 dashed;
					border-bottom:1px #666666 dashed;
					border-left:1px #666666 dashed;
					}
					.cellDashedTopRight {
					border-top:1px #666666 dashed;
					border-right:1px #666666 dashed;
					}
					.cellDashedTopLeft {
					border-top:1px #666666 dashed;
					border-left:1px #666666 dashed;
					}
					.cellDashedBottomRight {
					border-bottom:1px #666666 dashed;
					border-right:1px #666666 dashed;
					}
					.cellDashedBottomLeft {
					border-bottom:1px #666666 dashed;
					border-left:1px #666666 dashed;
					}
					.cellDashedTop {
					border-top:1px #666666 dashed;
					}
					.cellDashedRight {
					border-right:1px #666666 dashed;
					}
					.cellDashedBottom {
					border-bottom:1px #666666 dashed;
					}
					.cellDashedLeft {
					border-left:1px #666666 dashed;
					}
					.cellHeader {
					background-color:#CCCCCC;
					border-top:1px #000000 solid;
					border-right:1px #000000 solid;
					border-bottom:1px #000000 solid;
					padding:2px;
					text-align:center;
					text-transform:capitalize;
					text-align:center;
					font-family:helvetica;
					font-weight:bold;
					font-size:8pt;
					}
					.cellHeaderVertBT {
					background-color:#CCCCCC;
					border-top:1px #000000 solid;
					border-right:1px #000000 solid;
					border-bottom:1px #000000 solid;
					border-left:1px #000000 solid;
					padding:2px;
					writing-mode:tb-rl;filter: flipv fliph;
					text-align:center;
					text-transform:capitalize;
					text-align:center;
					font-family:helvetica;
					font-weight:bold;
					font-size:8pt;
					}
					.cellHeaderVertTB {
					background-color:#CCCCCC;
					border-top:1px #000000 solid;
					border-right:1px #000000 solid;
					border-bottom:1px #000000 solid;
					border-left:1px #000000 solid;
					padding:2px;
					writing-mode:tb-rl;filter: flipv flipv;
					text-align:center;
					text-transform:capitalize;
					text-align:center;
					font-family:helvetica;
					font-weight:bold;
					font-size:8pt;
					}
				</style>
				<script>
					onload = function() {top.window.resizeTo(1200,750);}
					function myFunction(dbody) {
					var printContents = document.getElementById(dbody).innerHTML;
					     var originalContents = document.body.innerHTML;
					     document.body.innerHTML = printContents;
					     window.print();
					     document.body.innerHTML = originalContents;
					                                          }
				</script>
				<body id="dbody" topmargin="50" leftmargin="50">
					        <table border="0" cellspacing="0" cellpadding="0" width="670">
						          <tr valign="top">
							      <td align="left" colspan="9">
								<img src="../imagesLegacy/Logos/aras_logo.gif" height="80"></img>
							      </td>
						         </tr>
						         <tr valign="bottom">
							      <td colspan="4" style="font-family:helvetica;font-size:15pt;color:#DA1943;padding:2px;" align="right" uniqueID="ms__id79">AQI Report</td>
							      <td colspan="3" style="font-family:helvetica;font-size:10pt;padding:2px;" align="right" uniqueID="ms__id80">Generated on: <script>function m00(r, n){r += ""; if (!n) n = 2; while(r.length &lt; n){r = "0" + r;} return r;} var dt = new Date(); var a = top.opener.top.aras; if (a){var s = m00(dt.getUTCFullYear(),4)+"-"+m00((dt.getUTCMonth()+1))+"-"+m00(dt.getUTCDate())+"T"+m00(dt.getUTCHours())+":"+m00(dt.getUTCMinutes())+":"+m00(dt.getUTCSeconds()); s = a.IomInnovator.GetI18NSessionContext().ConvertUtcDateTimeToNeutral(s, "yyyy-MM-ddTHH:mm:ss"); s = a.convertFromNeutral(s, "date", "short_date"); document.write(s);}</script>
						             </td>
					                </tr>
					                <tr class="cellHeader">
						             <th style="font-family:helvetica; font-size:8pt; padding:2px;">DateTime</th>
						             <th style="font-family:helvetica; font-size:8pt; padding:2px;">OZONE</th>
						             <th style="font-family:helvetica; font-size:8pt; padding:2px;">PM25</th>
						             <th style="font-family:helvetica; font-size:8pt; padding:2px;">PM10</th>
						             <th style="font-family:helvetica; font-size:8pt; padding:2px;">CO</th>
						             <th style="font-family:helvetica; font-size:8pt; padding:2px;">SO2</th>
						             <th style="font-family:helvetica; font-size:8pt; padding:2px;">NO2</th>
					                 </tr>
					              <xsl:for-each select="//Item">
						<xsl:sort select="aqi_datetime"/>
						          <tr>
							            <td style="font-family:helvetica; font-size:8pt; padding:2px;">
								              <xsl:call-template name="formatdate">
									                    <xsl:with-param name="DateTimeStr" select="aqi_datetime"/>
								                </xsl:call-template>
							           </td>
							              <xsl:call-template name="bgcolorchange">
								                    <xsl:with-param name="aqi_values" select="aqi_ozone"/>
							                </xsl:call-template>
							              <xsl:call-template name="bgcolorchange">
								                    <xsl:with-param name="aqi_values" select="aqi_pm25"/>
							                </xsl:call-template>
							              <xsl:call-template name="bgcolorchange">
								                    <xsl:with-param name="aqi_values" select="aqi_pm10"/>
							                </xsl:call-template>
							              <xsl:call-template name="bgcolorchange">
								                    <xsl:with-param name="aqi_values" select="aqi_co"/>
							                </xsl:call-template>
							              <xsl:call-template name="bgcolorchange">
								                    <xsl:with-param name="aqi_values" select="aqi_so2"/>
							                </xsl:call-template>
							              <xsl:call-template name="bgcolorchange">
								                    <xsl:with-param name="aqi_values" select="aqi_no2"/>
							                </xsl:call-template>
						          </tr>
					             </xsl:for-each>
				        </table>
			      </body>
		    </html>
	</xsl:template>
</xsl:stylesheet>