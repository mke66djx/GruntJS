/**
 * Created by admin on 2/23/2017.
 */
var mainScreenVorpal = require('vorpal')();
var campaignModeVorpal = require('vorpal')();
var dataModeVorpal = require('vorpal')();
var sellModeVorpal = require('vorpal')();
var inquirer = require('inquirer');




//##################Initialization#########################//

//Initialize and place in mainScreenMode
mainScreenVorpal.ui.redraw(
    ('\n')+ mainScreenVorpal.chalk.bgBlue('~~~~~~~~~~~~~~~~~ Grunt')+mainScreenVorpal.chalk.bgGreen('JS ~~~~~~~~~~~~~~~~~~~~') + ('\n'));

//Default power up mode
mainScreenVorpal
    .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
    .use(require('./commands/campaignModeCmds'))
    .use(require('./commands/sharedCmds'))
    .show()

campaignModeVorpal
    .delimiter(campaignModeVorpal.chalk.cyan('campaign-mode~>'))
    .use(require('./Commands/campaignModeCmds'))
    .use(require('./Commands/sharedCmds'))

dataModeVorpal
    .delimiter(dataModeVorpal.chalk.green('data-mode~>'))
    .use(require('./Commands/dataModeCmds'))
    .use(require('./Commands/sharedCmds'))

sellModeVorpal
    .delimiter(sellModeVorpal.chalk.blue('sellMode-mode~>'))
    .use(require('./Commands/sellModeCmds'))
    .use(require('./Commands/sharedCmds'))



//######################Functions##########################//

var enterMode = function(mode) {
    if (mode == 'homeMode') {
        mainScreenVorpal
            .delimiter(campaignModeVorpal.chalk.cyan('home-mode~>'))
            .show()

    } else if (mode == 'campaignMode') {
        campaignModeVorpal
            .delimiter(campaignModeVorpal.chalk.cyan('campaign-mode~>'))
            .show()

    } else if (mode == 'dataMode') {
        dataModeVorpal
            .delimiter(dataModeVorpal.chalk.green('data-mode~>'))
            .show()

    } else if (mode == 'sellMode') {
        sellModeVorpal
            .delimiter(sellModeVorpal.chalk.blue('sellMode-mode~>'))
            .show()
    }
};


//Export all public members
module.exports.enterMode = enterMode;


