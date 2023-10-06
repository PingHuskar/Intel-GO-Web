function doGet(e){

 // Change Spread Sheet url
 var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/<YOUR-G-SHEETS-URL>/edit#gid=1889347710");

// Sheet Name, Chnage Sheet1 to Users in Spread Sheet. Or any other name as you wish
 var sheet = ss.getSheetByName("<YOUR-SHEET-NAME>");
  
 return getUsers(sheet); 
  
}


function getUsers(sheet){
  var jo = {};
  var dataArray = [];

// collecting data from 2nd Row , 1st column to last row and last column
  var rows = sheet.getRange(2,1,sheet.getLastRow()-1, sheet.getLastColumn()).getValues();
  
  for(var i = 0, l= rows.length; i<l ; i++){
    var dataRow = rows[i];
    var record = {};
    // Make Changes Here
    record['time'] = dataRow[0];
    record['geo'] = dataRow[3];
    record['agent'] = dataRow[4];
    record['img'] = dataRow[5];
    
    dataArray.push(record);
    
  }  
  
  jo.user = dataArray;
  
  var result = JSON.stringify(jo);
  
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  
}  
