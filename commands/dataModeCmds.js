var stateEngine = require('../stateEng');
var myCsvModule =require('../Scripts/csvToJSON');
var path = require('path');
// var config = stateEngine.config;

module.exports = function(vorpal, options) {

    vorpal
        .command('manPrint<scriptTemplate><dataList><scriptConfigFile><dataConfigFile>', 'Manual campaign print command. User provides a script template, data file in csv or exel format, and configFile')
        .action(function(args, cb){

            standaloneListPath = getStandaloneListPath(dataList);
            scriptTemplatePath = getScriptTemplatePath(scriptTemplate);
            scriptConfigFilePath = getscriptConfigFilePath(scriptConfigFile);
            dataConfigFilePath = getDataConfigFilePath(dataConfigFile);

            //var standaloneList = path.join(config.get('DataMode.directoryConfig.standalone_lists_directory'), args.dataFile)
            //console.log(standaloneList);
            var standaloneList = 'Apts9PUnits.csv';
            myCsvModule.csvToJsonF(standaloneList, function(returnValue) {
                for(var myKey in returnValue) {
                    var firstName =  returnValue[myKey].OWNERFIRST;
                    //console.log(firstName);
                }
            });

            cb();
        });


};