/*
Raul Vargas
Javascript file for HW3 and updated for HW4
*/

let minColumnState = false;
let maxColumnState = false;
let minRowState = false;
let maxRowState = false;

generateTable = () => {
    let minColumn = parseInt(document.getElementById("minColumn").value); 
    let maxColumn = parseInt(document.getElementById("maxColumn").value);
    let minRow = parseInt(document.getElementById("minRow").value);
    let maxRow = parseInt(document.getElementById("maxRow").value);
    
    console.log(minColumn);
    console.log(maxColumn);
    
    let table = document.getElementById('table');
    let output="";
    
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
    $('#table').html(output);
}

//whenever the slider detects a change it will update the input and validate it if its a good value. Then it will generate the table
$("#minColumnSlider").slider({
    min: -50, max: 50, value: 0,
    slide: function (event, ui) {
        updateInputFromSlider("#minColumn", $(this).slider("value"));
        validateFirstLine();
        generateTable();
    },
});

$("#minColumn").change(function(){
    if(validateFirstLine()){
        generateTable();
    }
});

$("#maxColumnSlider").slider({
    min: -50, max: 50, value: 0,
    slide: function (event, ui) {
        updateInputFromSlider("#maxColumn", $(this).slider("value"));
        validateSecondLine();
        generateTable();
    },
});

$("#maxColumn").change(function(){
    if(validateSecondLine()){
        generateTable();
    }
});

$("#minRowSlider").slider({
    min: -50, max: 50, value: 0,
    slide: function (event, ui) {
        updateInputFromSlider("#minRow", $(this).slider("value"));
        validateThirdLine();
        generateTable();
    },
});

$("#minRow").change(function(){
    if(validateThirdLine()){
        generateTable();
    }
});

$("#maxRowSlider").slider({
    min: -50, max: 50, value: 0,
    slide: function (event, ui) {
        updateInputFromSlider("#maxRow", $(this).slider("value"));
        validateFourthLine();
        generateTable();
    },
});

$("#maxRow").change(function(){
    if(validateFourthLine()){
        generateTable();
    }
});
//supplemental function to get whatever is in the slider and update it to the corresponding form entry
function updateInputFromSlider(input_id, value) {
    $(input_id).val(value);
}

$(document).ready(function () {
    //minColumnChanges
    $("#minColumn").change(function () { 
        $("#minColumnSlider").slider("value", $(this).val());
    });
    
    //maxColumnChanges
    $("#maxColumn").change(function () { 
        $("#maxColumnSlider").slider("value", $(this).val());
    });

    //minRowChanges
    $("#minRow").change(function () { 
        $("#minRowSlider").slider("value", $(this).val());
    });  

    //maxRowChanges
    $("#maxRow").change(function () { 
        $("#maxRowSlider").slider("value", $(this).val());
    });

    validateFirstLine();
    validateSecondLine();
    validateThirdLine();
    validateFourthLine();
    validateLines();
    
});

// my own supplemental validation
function validateFirstLine(){
    let minColumnNew = $("#minColumn").val();

    if(minColumnNew < -50 || minColumnNew > 50){
        $("#minColumnCheck").show();
        minColumnState = false;
        return false;
    }

    else{
        $("#minColumnCheck").hide();
        minColumnState = true;
        return true;
    }
}

function validateSecondLine(){
    let maxColumnNew = $("#maxColumn").val();
    
    if(maxColumnNew < -50 || maxColumnNew > 50){
        $("#maxColumnCheck").show();
        maxColumnState = false;
        return false;
    }

    else{
        $("#maxColumnCheck").hide();
        maxColumnState = true;
        return true;
    }
}

function validateThirdLine(){
    let minRowNew = $("#minRow").val();
    
    if(minRowNew < -50 || minRowNew > 50){
        $("#minRowCheck").show();
        minRowState = false;
        return false;
    }

    else{
        $("#minRowCheck").hide();
        minRowState = true;
        return true;
    }
}

function validateFourthLine(){
    let maxRowNew = $("#maxRow").val();
    
    if(maxRowNew < -50 || maxRowNew > 50){
        $("#maxRowCheck").show();
        maxRowState = false;
        return false;
    }

    else{
        $("#maxRowCheck").hide();
        maxRowState = true;
        return true;
    }
}

$(document).ready(function() {
    $("#tabs").tabs(); //generates the tabs when the document is first loaded 
    // https://stackoverflow.com/questions/2416547/how-to-add-and-remove-jquery-tabs-dynamically

    $("#submitButton").click(function() {
        
        let minColumnValue = $("#minColumn").val();
        let maxColumnValue = $("#maxColumn").val();
        let minRowValue = $("#minRow").val();
        let maxRowValue = $("#maxRow").val();
    
        let num_tabs = $("div#tabs ul li").length + 1; // keep track of tab for indexing

        $("div#tabs ul").append("<li><a href='#tab" + num_tabs + "'>#"  + minColumnValue + "," + maxColumnValue + "," + minRowValue + "," + maxRowValue +"</a></li>");
        $("div#tabs").append("<div id='tab" + num_tabs + "'>#" + $('#table').html() + "</div>"); // puts the table in the tab
        $("div#tabs").tabs("refresh"); 
    });

    $("#deleteIndividualTabs").click(function(){
        var indexTab = (parseInt($("#tabIndex").val(), 10)); 
        indexTab-=1; //offsets when a tab is deleted
        $("#tabs").find(".ui-tabs-nav li:eq(" + tabIndex + ")").remove(); 
        $("#tabs").tabs("refresh");
    });

    $("#deleteAllButton").click(function(){
        $('#tabs').tabs().empty();
        $('#tabs').tabs().find(":not(:first-child)").remove();
        $('#tabs').tabs().tabs('refresh');
        
    });
});

function validateLines(){
    $("#inputForm").validate({
        rules: {
            minColumn:{
                required: true,
                min: -50,
                max: 50,
                step: 1 //requires integers to be inputted
            },
            
            maxColumn:{
                required: true,
                min: -50,
                max: 50,
                step: 1
            },

            minRow:{
                required: true,
                min: -50,
                max: 50,
                step: 1
            },

            maxRow:{
                required: true,
                min: -50,
                max: 50,
                step: 1
            }
        },

        messages:{
            minColumn: {
                required: 'Input must be between -50 and 50.',
                min: "Input is too low.",
                max: "Input is too high.",
                step: "Input must be an integer."
            },

            maxColumn:{
                required: "Input must be between -50 and 50.",
                min: "Input is too low.",
                max: "Input is too high.",
                step: "Input must be an integer."
            },

            minRow:{
                required: "Input must be between -50 and 50.",
                min: "Input is too low.",
                max: "Input is too high.",
                step: "Input must be an integer."
            },

            maxRow:{
                required: "Input must be between -50 and 50.",
                min: "Input is too low.",
                max: "Input Input is too high.",
                step: "Input must be an integer."
            }
        }
    });
}

// Submit button
$("#submitButton").click(function () {
    validateFirstLine();
    validateSecondLine();
    validateThirdLine();
    validateFourthLine();
    validateLines();
    
    if(minColumnState && maxColumnState && minRowState && maxRowState){
        generateTable();
    }
});