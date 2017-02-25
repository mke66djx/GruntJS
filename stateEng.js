/**
 * Created by admin on 2/23/2017.
 */

var Vorpal = require('vorpal');
var inquirer = require('inquirer');
var config = require('config');


var mainScreenVorpal = new Vorpal();
var campaignModeVorpal = new Vorpal();
var dataModeVorpal = new Vorpal();
var sellModeVorpal = new Vorpal();

var working_dir;

var init = function() {
//Initialize and place in mainScreenMode
    mainScreenVorpal.ui.redraw(
        ('\n') + mainScreenVorpal.chalk.bgBlue('~~~~~~~~~~~~~~~~~ Grunt') + mainScreenVorpal.chalk.bgGreen('JS ~~~~~~~~~~~~~~~~~~~~') + ('\n'));

//configSingleton
//var directory = config.get('homeMode.directory');

working_dir = config.get('HomeMode.directoryConfig.main_directory');

//Initiate all vorpal instances to use their own set of commands
    //Home will show on power-up
    mainScreenVorpal
        .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
        .use(require('./commands/campaignModeCmds'))
        .use(require('./commands/sharedCmds'))
        .history('iTunes-remote')
        .show()

    campaignModeVorpal
        .use(require('./Commands/campaignModeCmds'))
        .use(require('./Commands/sharedCmds'))
        .history('iTunes-remotes')

    dataModeVorpal
        .use(require('./Commands/dataModeCmds'))
        .use(require('./Commands/sharedCmds'))
        .history('iTunes-remotess')

    sellModeVorpal
        .use(require('./Commands/sellModeCmds'))
        .use(require('./Commands/sharedCmds'))
        .history('iTunes-remotess')

};

//######################Functions##########################//

var enterMode = function(mode) {
    if (mode == 'homeMode') {
        working_dir = config.get('HomeMode.directoryConfig.main_directory');
        mainScreenVorpal
            .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
            .show()

    } else if (mode == 'campaignMode') {
        working_dir = config.get('CampaignMode.directoryConfig.main_directory');
        campaignModeVorpal
            .delimiter(campaignModeVorpal.chalk.cyan('campaign-mode~>'))
            .show()

    } else if (mode == 'dataMode') {
        working_dir = config.get('DataMode.directoryConfig.main_directory');
        dataModeVorpal
            .delimiter(dataModeVorpal.chalk.green('data-mode~>'))
            .show()

    } else if (mode == 'sellMode') {
        working_dir = config.get('SellMode.directoryConfig.main_directory');
        sellModeVorpal
            .delimiter(sellModeVorpal.chalk.blue('sellMode-mode~>'))
            .show()
    }
};


//Export all public members
module.exports.init = init;
module.exports.enterMode = enterMode;


