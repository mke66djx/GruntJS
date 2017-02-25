var stateEngine = require('../stateEng');

module.exports = function(vorpal, options) {
    vorpal
        .command('enter <state_mode>', 'Enters a user mode')
        .autocomplete(['homeMode','campaignMode', 'dataMode', 'sellMode',])
        .action(function(args, cb){
            stateEngine.enterMode(args.state_mode);
            console.log('HEllo!!')
            cb();
        });

}
