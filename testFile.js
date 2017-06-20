
var textract = require('textract');

var path = require('path');
textract.fromFileWithPath(path.normalize("C:/Users/admin/Desktop/New folder/GruntJS/work_spaces/data/scriptTemplates/Sacramento/Untitled1.odt"), function( error, text ) {
    if(error){
        console.log("Error: Reading Script Template File Failed!");
    }
    else{
        console.log(text);
    }

})