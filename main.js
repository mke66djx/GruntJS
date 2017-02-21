'use strict';

var mainScreenVorpal = require('vorpal')();

var campaignModeVorpal = require('vorpal')();
var dataModeVorpal = require('vorpal')();
var wholesaleModeVorpal = require('vorpal')();

var inquirer = require('inquirer');

//Print application banner
function main() {
     mainScreenVorpal.ui.redraw(
         ('\n')+ mainScreenVorpal.chalk.bgBlue('~~~~~~~~~~~~~~~~~ Grunt')+mainScreenVorpal.chalk.bgGreen('JS ~~~~~~~~~~~~~~~~~~~~') + ('\n')
     );
    entry();
}


//##############Commands for all Modes##########
//##############################################

//Return Commands
campaignModeVorpal
    .command('return', 'Returns to entry point')
    .action(function(args, cb) {
        campaignModeVorpal.hide()
        entry();
        cb();
    });

dataModeVorpal
    .command('return', 'Returns to entry point')
    .action(function(args, cb) {
        dataModeVorpal.hide()
        entry();
        cb();
    });

wholesaleModeVorpal
    .command('return', 'Returns to entry point')
    .action(function(args, cb) {
        wholesaleModeVorpal.hide()
        entry();
        cb();
    });


function campaignMode(){
    campaignModeVorpal
        .delimiter(campaignModeVorpal.chalk.cyan('campaign-mode~>'))
        .show()
}

function dataMode(){
    dataModeVorpal
        .delimiter(dataModeVorpal.chalk.green('data-mode~>'))
        .show()

}

function wholeSaleMode(){
    wholesaleModeVorpal
        .delimiter(wholesaleModeVorpal.chalk.blue('wholesale-mode~>'))
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
                    'Wholesale Mode',
                    new inquirer.Separator(),
                    'Exit'
                ]
            }
        ]).then(function (answer) {
            if (answer.theme === 'Campaign Mode') {
                campaignMode()
            } else if (answer.theme === 'Data Mode') {
                dataMode()
            } else if (answer.theme === 'Wholesale Mode') {
                wholeSaleMode()
            } else if (answer.theme === 'Exit') {

            }
        });
}

main();







