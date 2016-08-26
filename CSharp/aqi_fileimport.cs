System.Diagnostics.Debugger.Break();
Innovator inno = this.getInnovator();
string getid = this.getID();
string addfilePath = this.getProperty("aqi_filepath");
string fileName = System.IO.Path.GetFileName(addfilePath);
string userID = inno.getUserID();
//get file
string defaultvault  = System.IO.Path.GetTempPath(); //getDefaultVault(inno,userID);
string fileID = this.getProperty("id") ; //CheckInFile(inno,addfilePath,defaultvault);
string filePath = CheckOutFile(inno,fileID,defaultvault,fileName);
// get File
DataTable dt = new DataTable();
string extension = System.IO.Path.GetExtension(filePath);
if(extension != ".csv")
{
string conStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + filePath + ";Extended Properties=Excel 12.0;";
//Create Connection String
OleDbConnection conexl = new OleDbConnection(conStr);
OleDbCommand  cmdexl = new OleDbCommand();
OleDbDataAdapter oda = new OleDbDataAdapter();

cmdexl.Connection = conexl;

//Get the name of First Sheet of Import Excel File
conexl.Open();
DataTable dtExlShma;
dtExlShma = conexl.GetOleDbSchemaTable(OleDbSchemaGuid.Tables,null);
string SheetName = dtExlShma.Rows[0]["Table_Name"].ToString();
conexl.Close();
 //Read Data from First Sheet
    conexl.Open();
    cmdexl.CommandText = "SELECT * From [" + SheetName + "]";
    oda.SelectCommand = cmdexl;
    oda.Fill(dt);
    conexl.Close(); 
}else{
	dt = CSVtoDataTable(filePath);
}
int Totdt = dt.Rows.Count; 
if(Totdt>0)
{
	
  foreach(DataRow row in dt.Rows)
 { 
     string Date = Convert.ToDateTime(row[0]).ToString("yyyy-MM-ddTHH:mm:ss");
     float vbat = float.Parse(row[1].ToString());
     float pm25 = float.Parse(row[2].ToString());
     float pm10 = float.Parse(row[3].ToString());
     float pmtot = float.Parse(row[4].ToString());
     float lpm = float.Parse(row[5].ToString());
     float pumb = float.Parse(row[6].ToString());
     float ws = float.Parse(row[7].ToString());
     float wd = float.Parse(row[8].ToString());
     float wdsd = float.Parse(row[9].ToString());
     float rfail = float.Parse(row[10].ToString());
     float grad = float.Parse(row[11].ToString());
     float degc = float.Parse(row[12].ToString());
     float mc2 = float.Parse(row[13].ToString());
     float rh = float.Parse(row[14].ToString());
     float mbar = float.Parse(row[15].ToString());

	  Item itm = inno.newItem("aqi_dustdata","add");
      itm.setProperty("aqi_date",Date.ToString());
	  itm.setProperty("aqi_vbat",vbat.ToString());
	  itm.setProperty("aqi_pm2p5",pm25.ToString());
	  itm.setProperty("aqi_pm10",pm10.ToString());
	  itm.setProperty("aqi_pm_tot",pmtot.ToString());
	  itm.setProperty("aqi_lpm",lpm.ToString());
	  itm.setProperty("aqi_pump",pumb.ToString());
	  itm.setProperty("aqi_ws",ws.ToString());
	  itm.setProperty("aqi_wd",wd.ToString());
	  itm.setProperty("aqi_wdsd",wdsd.ToString());
	  itm.setProperty("aqi_r_fall",rfail.ToString());
	  itm.setProperty("aqi_g_rad",grad.ToString());
	  itm.setProperty("aqi_degc",degc.ToString());
	  itm.setProperty("aqi_2mc",mc2.ToString());
	  itm.setProperty("aqi_percentrh",rh.ToString());
	  itm.setProperty("aqi_mbar",mbar.ToString());
	  itm = itm.apply();
 }
}

Item FileDelete = inno.applySQL("DELETE located where SOURCE_ID = '" +fileID + "'  ; DELETE [File] WHERE ID = '" + fileID +"';");
return this;
}
public static DataTable CSVtoDataTable(string strFilePath)
  {
    DataTable dt = new DataTable();
    using (StreamReader sr = new StreamReader(strFilePath))
    {
        string[] headers = sr.ReadLine().Split(',');
        foreach (string header in headers)
        {
            dt.Columns.Add(header);
        }
        while (!sr.EndOfStream)
        {
            string[] rows = sr.ReadLine().Split(',');
            DataRow dr = dt.NewRow();
            for (int i = 0; i < headers.Length; i++)
            {
                dr[i] = rows[i];
            }
            dt.Rows.Add(dr);
         }

    }
    return dt;
}

public static string CheckInFile(Innovator inno, string filePath, string DefaultVault)
{
       string returnID = "";
       if (filePath != string.Empty)
       {
        Aras.IOM.Item fileItem = inno.newItem("File", "add");
        string filename_with_extension = System.IO.Path.GetFileName(filePath);
        fileItem.setProperty("filename", filename_with_extension);
        fileItem.attachPhysicalFile(filePath);
        Aras.IOM.Item CheckIn = fileItem.apply();
        if (CheckIn.isError())
        {
           throw new Exception(string.Format("Failed to check-in file '{0}': {1}", filePath));
        }
        returnID = CheckIn.getID();
        }
      return returnID;
}
public static string CheckOutFile(Innovator inno,string fileID,string checkOutDirector,string fileName)
{
        string FileDirectory = checkOutDirector + fileName;
        if(File.Exists(FileDirectory))
		{
			File.Delete(FileDirectory);
		}
        Item get_file_request = inno.newItem();
        get_file_request.setType("File");
        get_file_request.setAction("get");
        get_file_request.setID(fileID);
        Item fileItem = get_file_request.apply();
        Item checkoutResult = fileItem.checkout(checkOutDirector);
        if(checkoutResult.isError())
        throw new Exception(string.Format("Failed to check-out file with ID={0}: {1}", fileID));
        return FileDirectory;
}
public static string getDefaultVault(Innovator inno,string userID)
{
   Item user = inno.newItem("user","get");
	user.setID(userID);
	user.setAttribute("select","default_vault");
	user = user.apply();
	return user.getProperty("default_vault");
	