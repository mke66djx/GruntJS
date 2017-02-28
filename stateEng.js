/**
 * Created by admin on 2/23/2017.
 */

const Vorpal = require('vorpal');
const inquirer = require('inquirer');
var config = require('config');
var process = require('process');

const mainScreenVorpal = new Vorpal();
const campaignModeVorpal = new Vorpal();
const dataModeVorpal =  new Vorpal();
const sellModeVorpal = new Vorpal();

var cash = require('cash');
var working_dir;
var dir;

//#################Private Functions####################
function changeWorkingDir(directory){
    console.log('Starting directory: ' + process.cwd());
    try {
        working_dir = directory;
        process.chdir(directory);
        console.log('New directory: ' + process.cwd());
    }
    catch (err) {
        console.log('chdir: ' + err);
    }
}

function appendGlobalWorkDir(directory){
    working_dir =  __dirname + directory;
    return working_dir;
}

function returnWorkingDir(){
    return process.cwd();
}


//####################Cash Functions####################
function cashLs(parameter){
    //return cash.ls([parameter],{l: true, all: true, humanreadable: true});
    return cash(parameter);
}

//Does not change working direcotry, only changing mode can change it
function cashCd(directory){
    cash.cd(directory);
}

function cashPwd(){
    return cash.pwd();
}


//Initialize and place in mainScreenMode
var init = function() {

    mainScreenVorpal.ui.redraw(
        ('\n') + mainScreenVorpal.chalk.bgBlue('~~~~~~~~~~~~~~~~~ Grunt') + mainScreenVorpal.chalk.bgGreen('JS ~~~~~~~~~~~~~~~~~~~~') + ('\n'));

    dir = config.get('HomeMode.directoryConfig.main_directory');
    changeWorkingDir(appendGlobalWorkDir(dir));

    //Initiate all vorpal instances to use their own set of commands
    mainScreenVorpal
        .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
        .use(require(__dirname + '/commands/sharedCmds'))
        .show();

    campaignModeVorpal
        .use(require(__dirname + '/commands/campaignModeCmds'))
        .use(require(__dirname + '/commands/sharedCmds'))
        .show();

    dataModeVorpal
        .use(require(__dirname + '/commands/dataModeCmds'))
        .use(require(__dirname + '/commands/sharedCmds'))
        .show();

    sellModeVorpal
        .use(require(__dirname + '/commands/sellModeCmds'))
        .use(require(__dirname + '/commands/sharedCmds'))
        .show();

};

//######################Functions##########################//

var enterMode = function(mode) {
    if (mode == 'homeMode') {
        dir = config.get('HomeMode.directoryConfig.main_directory');
        changeWorkingDir(appendGlobalWorkDir(dir));
        mainScreenVorpal
            .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
            .show();

    } else if (mode == 'campaignMode') {
        dir = config.get('CampaignMode.directoryConfig.main_directory');
        changeWorkingDir(appendGlobalWorkDir(dir));
        campaignModeVorpal
            .delimiter(campaignModeVorpal.chalk.cyan('campaign-mode~>'))
            .show();

    } else if (mode == 'dataMode') {
        dir = config.get('DataMode.directoryConfig.main_directory');
        changeWorkingDir(appendGlobalWorkDir(dir));
        dataModeVorpal
            .delimiter(dataModeVorpal.chalk.green('data-mode~>'))
            .show();

    } else if (mode == 'sellMode') {
        dir = config.get('SellMode.directoryConfig.main_directory');
        changeWorkingDir(appendGlobalWorkDir(dir));
        sellModeVorpal
            .delimiter(sellModeVorpal.chalk.blue('sellMode-mode~>'))
            .show();
    }
};

//Export all public members
module.exports.init = init;
module.exports.enterMode = enterMode;
module.exports.returnWorkingDir = returnWorkingDir;
module.exports.changeWorkingDir = changeWorkingDir;
module.exports.cashLs = cashLs;
module.exports.cashCd = cashCd;
module.exports.cashPwd = cashPwd;




