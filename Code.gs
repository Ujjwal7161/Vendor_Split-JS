function split_vendor() {
  
  var data = SpreadsheetApp.getActiveSpreadsheet();
  var initial_data = data.getActiveSheet();
  var sysco = initial_data.getRange("Price_Catalog!B2:B70").getValues();
  var id = data.getSheetByName("Total_Order").getRange("A2:H87");
  var id_values = id.getValues();
  var numOfColumn = id_values[0].length;

  console.log(sysco)

  sysco = sysco.map(function (row) 
  {
    return row[0];
  })
  var depot = initial_data.getRange("Price_Catalog!C2:C70").getValues();
  depot = depot.map(function(row)
  {
    return row[0];
  })
  var performance = initial_data.getRange("Price_Catalog!D2:D70").getValues();
  performance = performance.map(function(row)
  {
    return row[0]; 
  })
  
  var sysco_arr = [];
  var depot_arr = [];
  var performance_arr = [];
  for(var y =0; y < sysco.length; y++)
  {
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

    console.log(sysco_len);
    console.log(sysco_arr);
  var sysco_sheet =  data.getSheetByName("Sysco_Split");
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



    // FOR REFERENCE 
  //performance_sheet.getRange(2,1,performance_len,1).setValues(Object.keys(performance_arr[0]).map(function (columnNumber){
  //    return performance_arr.map(function(row){
  //      return row[columnNumber];
  //    })
  //}));






}
