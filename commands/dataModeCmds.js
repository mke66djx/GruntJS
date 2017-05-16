var stateEngine = require('../stateEng');
var myCsvModule =require('../Scripts/csvToJSON');
var path = require('path');

module.exports = function(vorpal, options) {

    vorpal
        .command('manPrint <scriptTemplate><dataFile><configFile>', 'Manual campaign print command. User provides a script template, data file in csv or exel format, and configFile')
        .action(function(args, cb){
            var filePath = path.join("./standaloneLists/", args.dataFile)
            myCsvModule.csvToJsonF(filePath, function(returnValue) {
                //console.log(returnValue);
                for(var myKey in returnValue) {
                    var firstName =  returnValue[myKey].OWNERFIRST;
                }
            });

            cb();
        });

};