function sheetnames() {
    var out = new Array();
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  
    for (var i=6; i<sheets.length ; i++) {
        var columns = sheets[i].getLastColumn(); //gets the last collumn with content( the lenght)
        var content = sheets[i].getSheetValues(0, 0, 1, columns)[0]; // get one row
        var newRow = content.unshift(sheets[i].getName());
        out.push(newRow);
    }
    return out 
}

