var printfilename = 'output.pdf';
var printer = require("printer")

function printSingleFile(fileNamePath){

    var filenamePrint = fileNamePath || __filename;

    if( process.platform != 'win32') {
        console.log("Top Part");
        printer.printFile({filename:filenamePrint,
            printer: process.env[3], // printer name, if missing then will print to default printer
            success:function(jobID){
                console.log("sent to printer with ID: "+jobID);
            },
            error:function(err){
                console.log(err);
            }
        });
    } else {
        // not yet implemented, use printDirect and text
        var fs = require('fs');
        printer.printDirect({data:fs.readFileSync(filenamePrint),
            printer: process.env[3], // printer name, if missing then will print to default printer
            success:function(jobID){
                console.log("sent to printer with ID: "+jobID);
            },
            error:function(err){
                console.log(err);
            }
        });
    }
}

module.exports.printSingleFile = printSingleFile;