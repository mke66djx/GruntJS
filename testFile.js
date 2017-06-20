
var textract = require('textract');

var path = require('path');
textract.fromFileWithPath(path.normalize("/home/edit/GruntJS/work_spaces/data/scriptTemplates/Sacramento/testTemplateLetter.docx"), function( error, text ) {
    if(error){
        console.log("Error: Reading Script Template File Failed!");
    }
    else{
        var arr = text.split("{");
        arr.forEach(function (value, i) {
           arr[i] = value.substring(0, value.indexOf('}'))
        });
        numElements = arr.length;
        arr = Array.from(new Set(arr));
        console.log(arr)
    }

})

