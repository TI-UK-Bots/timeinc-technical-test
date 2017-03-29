/**
 *
 * Technical test for TimeInc
 * 
 * Author: Ajay Karwal <ajaykarwal@gmail.com>
 * Date: 29-03-2017
 *
 */

 /*
  Notes:
  1. Get AJAX Result
  2. Build Table
  3. Append items x to (x + 50)
  4. Click button ...
  4.1. Set x = (x + 50)
  4.2. Repeat step 3
 */

var dataPath = 'https://gist.githubusercontent.com/jizq/8177ddf6efc335bd8c2094fd2cf1a5fb/raw/e2c4eac365a3872fc9267e0c80d1b2f8b9c754a5/data.json',
    responseData = null,
    currentRowsDisplayed = null,
    rowsTo = null,
    resultsToShow = 50;

// STEP 1
getResults = function(){
  $.ajax({
    type: 'GET',
    url: dataPath,
    dataType: 'json',
    success: function(data) {
      responseData = data;
      buildTable(responseData);
    }
  });
  // make responseData global.
  return responseData;
}

// STEP 2
buildTable = function(responseData) {
  // Create a table node to append rows to.
  $('#output').html('<table><tbody></tbody></table>');

  // Append rows from 1st index to the number of results to show.
  appendRows(responseData, 0, resultsToShow);
}

// STEP 3
appendRows = function(data, rowsFrom, rowsTo) {
  // console.log('Showing rows: '+ (rowsFrom+1) + ' to ' + rowsTo);

  // If the responseData limit is reached, set upper row limit
  // equal to the number of results. Alert the user.
  if(rowsTo > responseData.length) {
    rowsTo = responseData.length;
    alert('All results shown - ' + responseData.length);
  }

  // Construct the rows and append to the table body.
  var rowsData = '';
  for (var i = rowsFrom; i < rowsTo; i++) {
    rowsData += '<tr>'+
                // '<td width="50">ID: '+ data[i].id+'</td>'+
                '<td>'+ data[i].teaser+'</td>'+
                '<td>'+data[i].description+'</td>'+
                '<td><img src="'+data[i].image+'" /></td>'+
                '</tr>';
    rowsFrom ++;
  }
  $('tbody').append(rowsData);

  // Update and return the number of currentRowsDisplayed.
  currentRowsDisplayed = rowsFrom;
  return currentRowsDisplayed;

}

// STEP 4
$('button').on('click', function() {
  // Set the upper rows limit to current rows + results to show.
  newRowsEnd = currentRowsDisplayed + resultsToShow;
  
  // Append new rows to the table body.
  appendRows(responseData, currentRowsDisplayed, newRowsEnd);
})


$(document).ready(function($) {
  // Initialise the table.
  getResults();

  // Update the button text to show how many rows are being added.
  $('button').text('Load '+ resultsToShow +' more')
});






