var stateEngine = require('../stateEng');


module.exports = function(vorpal, options) {

    //Manual print job
    vorpal
        .command('manPrint <csvDataFile> <scriptFile> <confiFile>', 'Manually prints a job, given a csv data-file, script-file, and config-file')
        .action(function(args, cb){
            console.log(args.csvDataFile);
            cb();
        });




};


