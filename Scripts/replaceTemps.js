var JSZip = require('jszip');
var docxtemplate = require('docxtemplater');
var fs = require('fs');
var path = require('path');

function replaceAllTemps(filePathIn,fileOut,jsonOfParams) {
    console.log("FilePathIn",filePathIn);
//Load the docx file as a binary
    var content = fs
        .readFileSync(path.resolve(__dirname, filePathIn), 'binary');

    var zip = new JSZip(content);
    var doc = new docxtemplate();
    doc.loadZip(zip);

//set the templateVariables
//     doc.setData({
//         first_name: 'John',
//         last_name: 'Doe',
//         phone: '0652455478',
//         description: 'New Website'
//     });

doc.setData(jsonOfParams);

// render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    try {
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        throw error;
    }

    var buf = doc.getZip()
        .generate({type: 'nodebuffer'});

    fs.writeFileSync(path.resolve(__dirname,fileOut), buf);

}


module.exports.replaceAllTemps= replaceAllTemps;




