/**
 * Created by admin on 2/23/2017.
 */

const Vorpal = require('vorpal');
const inquirer = require('inquirer');
var config = require('config');
var configCounties = require('./config/counties.json');


var process = require('process');
var printer = require("printer")
var util = require('util');


const mainScreenVorpal = new Vorpal();
const campaignModeVorpal = new Vorpal();
const dataModeVorpal =  new Vorpal();
const sellModeVorpal = new Vorpal();

var cash = require('cash');
var working_dir;
var county;

//#################Private Functions####################
function changeWorkingDir(directory){
    //console.log('Starting directory: ' + process.cwd());
    try {
        working_dir = directory;
        process.chdir(directory);
        //console.log('New directory: ' + process.cwd());
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
//#######################################################

//Initialize and place in mainScreenMode
var init = function() {

    county = 'Sacramento';
    changeCounty(county);
    mainScreenVorpal.ui.redraw(
        ('\n') + mainScreenVorpal.chalk.bgBlue('~~~~~~~~~~~~~~~~~ Grunt') + mainScreenVorpal.chalk.bgGreen('JS ~~~~~~~~~~~~~~~~~~~~') + ('\n'));
    changeWorkingDir(appendGlobalWorkDir(config.get('HomeMode.directoryConfig.main_directory')));
    mainScreenVorpal.log(mainScreenVorpal.chalk.green(county + " County") + ('\n'));

    //Initiate all vorpal instances to use their own set of commands
    mainScreenVorpal
        .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
        .use(require(appendGlobalWorkDir(config.get('HomeMode.directoryConfig.commandFilePath'))))
        .use(require(appendGlobalWorkDir(config.get('sharedCommands.commandFilePath'))))
        .show();

    campaignModeVorpal
        .use(require(appendGlobalWorkDir(config.get('CampaignMode.directoryConfig.commandFilePath'))))
        .use(require(appendGlobalWorkDir(config.get('sharedCommands.commandFilePath'))))
        .show();

    dataModeVorpal
        .use(require(appendGlobalWorkDir(config.get('DataMode.directoryConfig.commandFilePath'))))
        .use(require(appendGlobalWorkDir(config.get('sharedCommands.commandFilePath'))))
        .show();

    sellModeVorpal
        .use(require(appendGlobalWorkDir(config.get('SellMode.directoryConfig.commandFilePath'))))
        .use(require(appendGlobalWorkDir(config.get('sharedCommands.commandFilePath'))))
        .show();

};

//######################Functions##########################//

var enterMode = function(mode) {
    if (mode == 'homeMode') {
        changeWorkingDir(appendGlobalWorkDir(config.get('HomeMode.directoryConfig.main_directory')));
        mainScreenVorpal
            .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
            .show();

    } else if (mode == 'campaignMode') {
        changeWorkingDir(appendGlobalWorkDir(config.get('CampaignMode.directoryConfig.main_directory')));
        campaignModeVorpal
            .delimiter(campaignModeVorpal.chalk.cyan('campaign-mode~>'))
            .show();

    } else if (mode == 'dataMode') {
        changeWorkingDir(appendGlobalWorkDir(config.get('DataMode.directoryConfig.main_directory')));
        dataModeVorpal
            .delimiter(dataModeVorpal.chalk.green('data-mode~>'))
            .show();

    } else if (mode == 'sellMode') {
        changeWorkingDir(appendGlobalWorkDir(onfig.get('SellMode.directoryConfig.main_directory')));
        sellModeVorpal
            .delimiter(sellModeVorpal.chalk.blue('sellMode-mode~>'))
            .show();
    }
};


var checkCounty = function(county){
    flag = 0
    for(var myKey in configCounties) {
        if (county == configCounties[myKey].County) {
            flag = 1;
            break;
        }
    }
    return flag;

};

var changeCounty = function(countyP) {
    var checkR = checkCounty(countyP);
    if ( checkR === 0 ) {
       console.log(new Error("Invalid County"));
    }
    else {
        county = countyP;
    }
};

var getCounty = function() {
    return county;
};

//Export all public members
module.exports.init = init;
module.exports.enterMode = enterMode;
module.exports.returnWorkingDir = returnWorkingDir;
module.exports.changeWorkingDir = changeWorkingDir;
module.exports.cashLs = cashLs;
module.exports.cashCd = cashCd;
module.exports.cashPwd = cashPwd;
module.exports.util= util;
module.exports.printer= printer;
module.exports.config= config;
module.exports.changeCounty = changeCounty;
module.exports.getCounty = getCounty



