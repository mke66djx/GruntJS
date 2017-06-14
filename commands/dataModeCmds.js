var stateEngine = require('../stateEng');
var myCsvModule =require('../Scripts/csvToJSON');
var path = require('path');
const fsAutocomplete = require('vorpal-autocomplete-fs');
// var config = stateEngine.config;

module.exports = function(vorpal, options) {

    vorpal
        .command('manPrint<scriptTemplate><dataList><scriptConfigFile><dataConfigFile>', 'Manual campaign print command. User provides a script template, data file in csv or exel format, and configFile')
        .autocomplete(fsAutocomplete())
        .action(function(args, cb){
            failFlag = 0;
            dataListPath = stateEngine.getDataListPath(args.dataList, function(err,filepath){
                if (err) {
                    console.log('Error: Data File Does Not Exist!');
                    failFlag = 1;
                    return err;
                }
                else
                    return filepath;
            });

            scriptTemplatePath = stateEngine.getScriptTemplatePath(args.scriptTemplate, function(err,filepath){
                if (err) {
                    console.log('Error: Script-Template File Does Not Exist!');
                    failFlag = 1;
                    return err;
                }
                else
                    return filepath;
            });

            scriptConfigPath = stateEngine.getScriptConfigPath(args.scriptConfigFile, function(err,filepath){
                if (err) {
                    console.log('Error: Script Config File Does Not Exist!');
                    failFlag = 1;
                    return err;
                }
                else
                    return filepath;
            });

            dataConfigPath = stateEngine.getDataConfigPath(args.dataConfigFile, function(err,filepath){
                if (err) {
                    console.log('Error: Data Config File Does Not Exist!');
                    failFlag = 1;
                    return err;
                }
                else
                    return filepath;
            });

            if(failFlag == 0)
            {
                console.log("No errors found in inputs!! :)")
                // var standaloneList = 'Apts9PUnits.csv';
                // myCsvModule.csvToJsonF(standaloneList, function(returnValue) {
                //     for(var myKey in returnValue) {
                //         var firstName =  returnValue[myKey].OWNERFIRST;
                //         //console.log(firstName);
                //     }
                // });
            }
            cb();
        });


};