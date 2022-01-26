// The following code was developed for the sole purpose to differenciate vendors based on 
// their product prices. The primary purpose of this project was to reduce purchasing cost.
// It is in use currently by the purchasing and accouting department.   

// Connect with Appscript API (input spreadsheet)
function split_vendor() {
  
  var data = SpreadsheetApp.getActiveSpreadsheet();
  var initial_data = data.getActiveSheet();

  // Input the prices derived from Sysco (Primary Go-To Vendor)
  var sysco = initial_data.getRange("Price_Catalog!B2:B70").getValues();

  // Derive the names of the products 
  var id = data.getSheetByName("Total_Order").getRange("A2:H87");
  var id_values = id.getValues();
  var numOfColumn = id_values[0].length;
   
  console.log(sysco)

  // Calling each element of the 2D array to establish a 1D array.
  sysco = sysco.map(function (row) 
  {
    return row[0];
  })
  // Input the prices derived from Sysco (Seconday Vendor), performing 2D to 1D conversion
  var depot = initial_data.getRange("Price_Catalog!C2:C70").getValues();

  // Input the prices derived from Sysco (Primary Go-To Vendor), performing 2D to 1D conversion
  depot = depot.map(function(row)
  {
    return row[0];
  })

  // Input the prices derived from Sysco (Primary Go-To Vendor), performing 2D to 1D conversion
  var performance = initial_data.getRange("Price_Catalog!D2:D70").getValues();
  performance = performance.map(function(row)
  {
    return row[0]; 
  })
  
  // Empty Arrays to store the products based on the follwing comparision
  var sysco_arr = [];
  var depot_arr = [];
  var performance_arr = [];

  //Using for loop for to go over every product and check the prices listed
  // from each vendor (Sysco, Restaurant Depot, Performance) 
  for(var y =0; y < sysco.length; y++)
  {
    // only the minimum value gets stored in each respective vendor's order sheet
    // the selected minimum prices is compared with the array of prices given by each vendor
    var min = Math.min(sysco[y], depot[y], performance[y]);
    if(sysco[y] ==  min)
    {
      sysco_arr.push(id_values[y]); 
    }else if(depot[y] == min)
    {
        depot_arr.push(id_values[y]);
    }else if (performance[y]==min)
    {
      performance_arr.push(id_values[y]);
    }
  }

    // for the sysco script
  var sysco_len = sysco_arr.length;

    //console.log(sysco_len);
    //console.log(sysco_arr);
  var sysco_sheet =  data.getSheetByName("Sysco_Split");
  // determining the required rows and coloums. Frist we clear the current range in the sheet to make sure there is no over    lap, so we erase an extra 30 rows to be sure.  
  sysco_sheet.getRange(2,1,sysco_len+30,7).clearContent();
  sysco_sheet.getRange(2,1,sysco_len,numOfColumn).setValues(sysco_arr);

  // depot sheet
  var depot_len = depot_arr.length;
  
    console.log(depot_len);
  var depot_sheet =  data.getSheetByName("Restaurant_Depo");
  depot_sheet.getRange(2,1,depot_len+30,numOfColumn).clearContent();
  depot_sheet.getRange(2,1,depot_len,numOfColumn).setValues(depot_arr);


  // performance
   var performance_len = performance_arr.length;
  
    console.log(performance_len);
  var performance_sheet =  data.getSheetByName("Performance");
  performance_sheet.getRange(2,1,performance_len+30,numOfColumn).clearContent();
  performance_sheet.getRange(2,1,performance_len,numOfColumn).setValues(performance_arr);



    






}
