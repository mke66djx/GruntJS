'use strict';

var mainScreenVorpal = require('vorpal')();
var campaignModeVorpal = require('vorpal')();
var dataModeVorpal = require('vorpal')();
var sellModeVorpal = require('vorpal')();
var inquirer = require('inquirer');

var database = new Database(Config);


//Print application banner
function main() {
     mainScreenVorpal.ui.redraw(
         ('\n')+ mainScreenVorpal.chalk.bgBlue('~~~~~~~~~~~~~~~~~ Grunt')+mainScreenVorpal.chalk.bgGreen('JS ~~~~~~~~~~~~~~~~~~~~') + ('\n')
     );
    entry();
}

//Enter different modes
function campaignMode(){
    campaignModeVorpal
        .delimiter(campaignModeVorpal.chalk.cyan('campaign-mode~>'))
        .use(require('./Commands/campaignModeCmds'))
        .show()
}

function dataMode(){
    dataModeVorpal
        .delimiter(dataModeVorpal.chalk.green('data-mode~>'))
        .use(require('./Commands/dataModeCmds'))
        .show()

}

function sellMode(){
    sellModeVorpal
        .delimiter(sellModeVorpal.chalk.blue('sellMode-mode~>'))
        .use(require('./Commands/sellModeCmds'))
        .show()
}

//Application Entry point
function entry() {
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'theme',
                message: 'Select an operating mode:',
                choices: [
                    'Campaign Mode',
                    'Data Mode',
                    'Sell Mode',
                    new inquirer.Separator(),
                    'Exit'
                ]
            }
        ]).then(function (answer) {
            if (answer.theme === 'Campaign Mode') {
                campaignMode()
            } else if (answer.theme === 'Data Mode') {
                dataMode()
            } else if (answer.theme === 'Sell Mode') {
                sellMode()
            } else if (answer.theme === 'Exit') {

            }
        });
}

main();







