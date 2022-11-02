/*
Raul letgas
Javascript file for HW3
*/

generateTable = () => {
    //import all the values from the html form
    let minColumn = parse(document.getElementById("minColumn").value);
    let maxColumn = parse(document.getElementById("maxColumn").value);
    let minRow = parse(document.getElementById("minRow").value);
    let maxRow = parse(document.getElementById("maxRow").value);
    
    //get an id for the table and create a blank output
    let table = document.getElementById('table');
    let output="";
    
    //nested for loops to iterate through the edges and then fill out the table
    for(let i = minRow; i <= maxRow; i++) {
        if (i == minRow) {
            output+="<tr>" + "<td></td>";
            for(let j = minColumn; j <= maxColumn; j++) {//second for loop to do the outside columns
                output += "<td>"+ j +"</td>";
            }
            output+="</tr>";
        }
        output+="<tr>" + "<td>" + i + "</td>";
        for(let j = minColumn; j <= maxColumn; j++) {//third and final for loop to print out the values
            output += "<td>"+ i*j +"</td>";
        }
         output+="</tr>"
    }
    //set everything we have so far in the output to the html table
    table.innerHTML=output;
}
