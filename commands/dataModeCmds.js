var stateEngine = require('../stateEng');
var myCsvModule =require('../Scripts/csvToJSON');
var path = require('path');
const fsAutocomplete = require('vorpal-autocomplete-fs');
// var config = stateEngine.config;
var textract = require('textract');

module.exports = function(vorpal, options) {

    vorpal
        .command('manPrint<dataList><scriptTemplate><configFile>', 'Manual campaign print command. User provides a script template, data file in csv or exel format, and configFile')
        .autocomplete(fsAutocomplete())
        .action(function(args, cb){
            failFlag = 0;
            status = -1;


            textract.fromFileWithPath(args.scriptTemplate, function( error, text ) {
                if(error){
                    console.log("Error: Reading Script Template File Failed!");
                }
                else{
                     console.log(text);
                }

            })



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

            status,configPath = stateEngine.getConfigPath(args.configFile)
            if (status) {
                console.log('Error: Config File Does Not Exist!');
                failFlag = 1;
            }

            if(failFlag == 0)
            {
                myCsvModule.csvToJsonF(dataListPath, function(returnValue) {
                    for(var myKey in returnValue) {
                        var firstName =  returnValue[myKey].OWNERFIRST;
                        //console.log(firstName);
                    }
                });
            }
            cb();
        });


};