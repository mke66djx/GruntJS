var stateEngine = require('../stateEng');
var myCsvModule =require('../Scripts/csvToJSON');
var replaceTemps =require('../Scripts/replaceTemps');
var print =require('../Scripts/print');
var path = require('path');
const fsAutocomplete = require('vorpal-autocomplete-fs');
// var config = stateEngine.config;
var textract = require('textract');
var toPdf = require("office-to-pdf");


module.exports = function(vorpal, options)
{

    vorpal
        .command('manPrint<dataList><scriptTemplate><configFile>', 'Manual campaign print command. User provides a script template, data file in csv or exel format, and configFile')
        .autocomplete(fsAutocomplete())
        .action(function(args, cb)
        {
            failFlag = 0;
            status = -1;



            status,dataListPath = stateEngine.getDataListPath(args.dataList)
            if (status) {
                console.log('Error: Data File Does Not Exist!');
                failFlag = 1;
            }

            status,scriptTemplatePath = stateEngine.getScriptTemplatePath(args.scriptTemplate)
            if (status) {
                console.log('Error: Script-Template File Does Not Exist!');
                failFlag = 1;
            }

            status,dataConfigPath = stateEngine.getConfigPath(args.configFile)
            if (status) {
                console.log('Error: Config File Does Not Exist!');
                failFlag = 1;
            }


            if(failFlag == 0)
            {
                myCsvModule.csvToJsonF(dataListPath, function(returnValue)
                {


                    //Get all unique template params
                    textract.fromFileWithPath(scriptTemplatePath, function( error, text )
                    {
                        if(error){
                            console.log("Error: Reading Script Template File Failed!");
                        }
                        else
                        {
                            var scriptTemplateArr = text.split("{");
                            scriptTemplateArr.forEach(function (value, i) {
                                scriptTemplateArr[i] = value.substring(0, value.indexOf('}'))
                            });
                            numElements = arr.length;
                            templateParam_arr = Array.from(new Set(arr));

                            for(var myKey in returnValue)
                            {

                                jsonParams = stateEngine.generateParamsJson(templateParam_arr,returnValue[myKey],dataConfigPath)
                                tempDocDocXFilepath = stateEngine.getTempFilePath("tempDoc.docx");
                                tempDocPdfFilepath = stateEngine.getTempFilePath("tempDoc.pdf");

                                replaceTemps(scriptTemplatePath,tempDocDocXFilepath,jsonParams);
                                toPdf(tempDocDocXFilepath);
                                print.printSingleFile(tempDocPdfFilepath);
                            }

                        }

                    });

                });
            }
            cb();
        });

};