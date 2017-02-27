var stateEngine = require('../stateEng');
var cash = require('cash');

module.exports = function(vorpal, options) {

    vorpal
        .command('pwd', 'Unix pwd command')
        .action(function(args, cb){
            var pwd = stateEngine.cashPwd();
            this.log(pwd);
            cb();
        });

    vorpal
        .command('cd <directory>', 'Unix cd command')
        .action(function(args, cb){
            stateEngine.cashCd(args.directory);
            cb();
        });

    vorpal
        .command('ls [parameterss]', 'Unix ls shell cmd')
        .action(function(args, cb){
            console.log(args)
            console.log("args.parameterss");
            // if(args.length >=1){
            //     lsOut = stateEngine.cashLs(args.parameterss);
            // }
            // else
            //     lsOut = stateEngine.cashLs(' ');
            //this.log(lsOut);
            cb();
        });

    vorpal
        .command('enter <state_mode>', 'Enters a user mode')
        .autocomplete(['homeMode','campaignMode', 'dataMode', 'sellMode',])
        .action(function(args, cb){
            stateEngine.enterMode(args.state_mode);
            cb();
        });






};
