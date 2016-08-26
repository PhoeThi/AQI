//Innovator inn = this.getInnovator();
Item myResult;

// First grab an identity to send the mail to.
// You can find the ID by right clicking on an identity and selecting 
//"Properties" and then selecting "copy"
// Make sure that the user(s) in that identity have valid email addresses.
// Also, make sure that you use the ID of the *Identity*, not the *User*

Item idnt = inn.getItemById("Identity", "DBA5D86402BF43D5976854B8B48FCDD1");
//Next, grab the email we want
myResult = inn.applyAML("<AML>"+
"<Item type='Email Message' action='get'>"+
"<name>AQI</name>"+
"</Item></AML>"); 

Item myEmail = myResult.getItemByIndex(0);
idnt.email( myEmail, idnt );
return inn.newResult("email sent, worked great");