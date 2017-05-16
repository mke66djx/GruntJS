var stateEngine = require('../stateEng');

module.exports = function(vorpal, options) {


    //Various shell commands for basic navigation
    vorpal
        .command('clear', 'Unix clear command')
        .action(function(args, cb){
            this.log('\u001b[2J\u001b[0;0H\n');
            cb();
        });

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
        .command('ls [parameters]', 'Unix ls shell cmd')
        .action(function(args, cb){
            if(args.parameters)
            {
                lsOut = stateEngine.cashLs("ls -"+args.parameters);
            }
            else
                lsOut = stateEngine.cashLs('ls');
            this.log(lsOut);
            cb();
        });


    //Enter given user mode
    vorpal
        .command('enter <state_mode>', 'Enters a user mode')
        .autocomplete(['homeMode','campaignMode', 'dataMode', 'sellMode',])
        .action(function(args, cb){
            stateEngine.enterMode(args.state_mode);
            cb();
        });


    vorpal
        .command('county <county>', 'User provides -County- to localize file search scope')
        .action(function(args, cb){

            stateEngine.changeCounty(args.county);

            cb();
        });


    vorpal
        .command('getCounty', 'Get active county')
        .action(function(args, cb){
            county = stateEngine.getCounty();
            this.log(county + " County");
            cb();
        });





};
