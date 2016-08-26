<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:exslt="http://exslt.org/common" extension-element-prefixes="exslt" xmlns:aras="http://www.aras-corp.com">
	<xsl:output method="html" omit-xml-declaration="yes" standalone="yes" indent="yes"></xsl:output>
	<xsl:template match="/">
		<html>
			<head></head>
			<style type="text/css" userData="Global">
				table  {empty-cells:show; border-collapse:collapse;}
				th {font-family:helvetica; font-size:8pt;  padding:2px; border:1px #000000 solid; background-color:#CCCCCC; text-transform:capitalize;}
				td {font-family:helvetica; font-size:8pt;  padding:2px; border:1px #000000 solid;}
				td.noBorder {font-family:helvetica; font-size:8pt;  padding:2px; border-width:0;}
			</style>
			<body topmargin="50" leftmargin="50">
				<table border="0" cellspacing="0" cellpadding="0" width="650">
					<tr valign="top">
						<td class="noBorder" align="left" colspan="9">
							<img src="../imagesLegacy/Logos/aras_logo.gif" height="80"></img>
						</td>
					</tr>
					<tr valign="bottom">
						<td class="noBorder" colspan="8" style="font-family:helvetica;font-size:15pt;color:#DA1943;padding:2px;" align="left">Bill of Materials Report</td>
						<td class="noBorder" colspan="4" style="font-family:helvetica;font-size:10pt;padding:2px;" align="right">
							Generated on:              <script>function m00(r, n){r += ""; if (!n) n = 2; while(r.length &lt; n){r = "0" + r;} return r;} var dt = new Date(); var a = top.opener.top.aras; if (a){var s = m00(dt.getUTCFullYear(),4)+"-"+m00((dt.getUTCMonth()+1))+"-"+m00(dt.getUTCDate())+"T"+m00(dt.getUTCHours())+":"+m00(dt.getUTCMinutes())+":"+m00(dt.getUTCSeconds())+"+0000"; s = a.convertToNeutral(s, "date", "yyyy-MM-ddTHH:mm:sszzz"); s = a.convertFromNeutral(s, "date", "short_date"); document.write(s);}</script>
						</td>
					</tr>
					<tr>
						<th colspan="6">Indenture Level</th>
						<th>Part Number</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>AML Status</th>
						<th>Manufacturer</th>
						<th>Manufacturer Part</th>
					</tr>
					<xsl:call-template name="rootItems"></xsl:call-template>
				</table>
			</body>
			<script src="../../javascript/PopupMenu.js"></script>
		</html>
	</xsl:template>
	<xsl:template name="rootItems">
		<xsl:apply-templates select="//Result/Item[@type='Part']">
			<xsl:with-param name="Depth" select="0"/>
		</xsl:apply-templates>
	</xsl:template>
	<xsl:template name="getChildItem">
		<xsl:param name="Depth"/>
		<xsl:if test="$Depth!=5">
			<xsl:apply-templates select="Relationships/Item/related_id/Item[@type='Part']">
				<xsl:with-param name="Depth" select="$Depth + 1"/>
			</xsl:apply-templates>
		</xsl:if>
	</xsl:template>
	<xsl:template match="Item[@type='Part']">
		<xsl:param name="Depth"/>
		<xsl:variable name="rowCount">
			<xsl:choose>
				<xsl:when test="count(Relationships/Item[@type='Part AML'])=0">1</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="count(Relationships/Item[@type='Part AML'])"></xsl:value-of>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<tr>
			<td rowspan="{$rowCount}" width="20px" align="center">
				<xsl:if test="$Depth=0">0</xsl:if>
			</td>
			<td rowspan="{$rowCount}" width="20px" align="center">
				<xsl:if test="$Depth=1">1</xsl:if>
			</td>
			<td rowspan="{$rowCount}" width="20px" align="center">
				<xsl:if test="$Depth=2">2</xsl:if>
			</td>
			<td rowspan="{$rowCount}" width="20px" align="center">
				<xsl:if test="$Depth=3">3</xsl:if>
			</td>
			<td rowspan="{$rowCount}" width="20px" align="center">
				<xsl:if test="$Depth=4">4</xsl:if>
			</td>
			<td rowspan="{$rowCount}" width="20px" align="center">
				<xsl:if test="$Depth=5">5</xsl:if>
			</td>
			<td rowspan="{$rowCount}" width="120px">
				<xsl:value-of select="item_number"></xsl:value-of>
			</td>
			<td rowspan="{$rowCount}" width="120px">
				<xsl:value-of select="name"></xsl:value-of>
			</td>
			<td rowspan="{$rowCount}" width="80px" align="center">
				<xsl:choose>
					<xsl:when test="$Depth=0">1</xsl:when>
					<xsl:when test="$Depth!=0 and (../../quantity)=''">1</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="../../quantity"></xsl:value-of>
					</xsl:otherwise>
				</xsl:choose>
			</td>
			<td width="100px">
				<xsl:value-of select="Relationships/Item[@type='Part AML'][1]/state"></xsl:value-of>
			</td>
			<td width="120px">
				<xsl:value-of select="Relationships/Item[@type='Part AML'][1]/related_id/Item/manufacturer/@keyed_name"></xsl:value-of>
			</td>
			<td width="120px">
				<xsl:value-of select="Relationships/Item[@type='Part AML'][1]/related_id/Item/item_number"></xsl:value-of>
			</td>
		</tr>
		<xsl:apply-templates select="Relationships/Item[@type='Part AML'][position()!=1]"></xsl:apply-templates>
		<xsl:if test="$Depth!=5">
			<xsl:variable name="itemIdCount" select="count(Relationships/Item/related_id[not(child::Item)])"></xsl:variable>
			<xsl:if test="$itemIdCount != 0">
				<xsl:variable name="idForEach" select="Relationships/Item/related_id[not(child::Item)]"></xsl:variable>
				<xsl:for-each select="$idForEach">
					<xsl:variable name="tmpId" select="text()[1]"/>
					<xsl:choose>
						<xsl:when test="function-available('exslt:node-set')">
							<xsl:apply-templates select="//Item[@type='Part' and @id=exslt:node-set($tmpId)]">
								<xsl:with-param name="Depth" select="$Depth + 1"/>
							</xsl:apply-templates>
						</xsl:when>
						<xsl:when test="function-available('msxsl:node-set')">
							<xsl:apply-templates select="//Item[@type='Part' and @id=msxsl:node-set($tmpId)]">
								<xsl:with-param name="Depth" select="$Depth + 1"/>
							</xsl:apply-templates>
						</xsl:when>
					</xsl:choose>
				</xsl:for-each>
			</xsl:if>
		</xsl:if>
		<xsl:call-template name="getChildItem">
			<xsl:with-param name="Depth" select="$Depth"/>
		</xsl:call-template>
	</xsl:template>
	<xsl:template match="Item[@type='Part AML']">
		<tr>
			<td width="100px">
				<xsl:value-of select="state"></xsl:value-of>
			</td>
			<td width="120px">
				<xsl:value-of select="related_id/Item/manufacturer/@keyed_name"></xsl:value-of>
			</td>
			<td width="120px">
				<xsl:value-of select="related_id/Item/item_number"></xsl:value-of>
			</td>
		</tr>
	</xsl:template>
</xsl:stylesheet>