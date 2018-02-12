/**
 * Created by admin on 2/23/2017.
 */

var Vorpal = require('vorpal');
var textract = require('textract');
var config = require('config');
var configCounties = require('./config/counties.json');

var path = require('path')
var fs = require('fs')
var process = require('process');
var printer = require("printer")
var util = require('util');

const mainScreenVorpal = new Vorpal();

// var cash = require('cash');
var working_dir;
exec_dir = __dirname;
var county = -1;

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

function appendToGlobalWorkDir(directory){
    try {
        fileDir = path.join(working_dir, path.normalize(directory));
        var stats = fs.statSync(fileDir);
        return fileDir;
    }
    catch(err) {
        console.log(err);
        console.log("Failed in append global dir: " + directory)
        return err;
    }

}

function returnWorkingDir(){
    return process.cwd();
}

function checkDirectorySync(fileDir) {
    try {
        var stats = fs.statSync(fileDir);
        return 0;
    }
    catch(err) {
        console.log(err);
        return err;
    }
}


//####################Cash Functions####################
// function cashLs(parameter){
//     //return cash.ls([parameter],{l: true, all: true, humanreadable: true});
//     return cash.ls(parameter);
// }
//
// //Does not change working direcotry, only changing mode can change it
// function cashCd(directory){
//     cash.cd(directory);
// }
//
// function cashPwd(){
//     return cash.pwd();
// }

//Initialize and place in mainScreenMode
var init = function() {
    changeCounty(configCounties[0].County);
    mainScreenVorpal.ui.redraw(
        ('\n') + mainScreenVorpal.chalk.bgBlue('~~~~~~~~~~~~~~~~~ Grunt') + mainScreenVorpal.chalk.bgGreen('JS ~~~~~~~~~~~~~~~~~~~~') + ('\n'));
    changeWorkingDir(path.join(exec_dir,config.get('HomeMode.directoryConfig.main_directory')));
    mainScreenVorpal.log(mainScreenVorpal.chalk.green(capitalizeFirstLetter(county) + " County") + ('\n'));

    //Initiate all vorpal instances to use their own set of commands
    mainScreenVorpal
        .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
        .use(require(path.join(exec_dir,config.get('HomeMode.directoryConfig.commandFilePath'))))
        .use(require(path.join(exec_dir,(config.get('sharedCommands.commandFilePath')))))
        .use(require(path.join(exec_dir,config.get('CampaignMode.directoryConfig.commandFilePath'))))
        .use(require(path.join(exec_dir,config.get('DataMode.directoryConfig.commandFilePath'))))
        .use(require(path.join(exec_dir,config.get('SellMode.directoryConfig.commandFilePath'))))
        .history('gruntJSWorkHist')
        .show();

};

//######################Functions##########################//

var enterMode = function(mode) {
    if (mode == 'homeMode') {
        changeWorkingDir(path.join(exec_dir,config.get('HomeMode.directoryConfig.main_directory')));
        mainScreenVorpal
            .delimiter(mainScreenVorpal.chalk.cyan('home-mode~>'))
            .show();

    } else if (mode == 'campaignMode') {
        changeWorkingDir(path.join(exec_dir,config.get('CampaignMode.directoryConfig.main_directory')));
        mainScreenVorpal
            .delimiter(mainScreenVorpal.chalk.cyan('campaign-mode~>'))
            .show();

    } else if (mode == 'dataMode') {
        changeWorkingDir(path.join(exec_dir,config.get('DataMode.directoryConfig.main_directory')));
        mainScreenVorpal
            .delimiter(mainScreenVorpal.chalk.green('data-mode~>'))
            .show();


    } else if (mode == 'sellMode') {
        changeWorkingDir(path.join(exec_dir,config.get('SellMode.directoryConfig.main_directory')));
        mainScreenVorpal
            .delimiter(mainScreenVorpal.chalk.blue('sellMode-mode~>'))
            .show();
    }
};

//######################Path Finding Helper functions#################################

var checkFile = function(file){
    return [checkDirectorySync(appendToGlobalWorkDir(file)),appendToGlobalWorkDir(file)];
};

//#################County Helper Functions#################
var checkCounty = function(county,checkcb){
    flag = 0
    retError = "";
    try {
        for (var myKey in configCounties) {
            if (county == configCounties[myKey].County) {
                flag = 1;
                break;
            }
        }
        if (flag == 0) throw "County Does Not Exist!"
    }
    catch(err){
            retError = "Error: " + err + ".";
        }

    checkcb(retError,flag);

};

var changeCounty = function(countyP) {
    checkCounty(countyP,function(err,flag){
        if(err)
            {console.log(err);}
        else
            checkR = flag;
            county = countyP;
    });
};

var getCounty = function() {
    return county;
};

var capitalizeFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
};

//####################### Data Mode Helpers#######################
var generateParamsJson = function(dataListItem,configFilePath,templateParams) {
    var jsonData = {};
    var dataConfigs = require(configFilePath);

    templateParams.forEach(function(element)
    {
        jsonData[element] = dataListItem[(dataConfigs.Headers[element])];
    });

    return jsonData;
};

//Export all public members
module.exports.init = init;
module.exports.enterMode = enterMode;
module.exports.returnWorkingDir = returnWorkingDir;
module.exports.changeWorkingDir = changeWorkingDir;
// module.exports.cash = cash;
// module.exports.cashLs = cashLs;
// module.exports.cashCd = cashCd;
// module.exports.cashPwd = cashPwd;
module.exports.util= util;
module.exports.printer= printer;
module.exports.config= config;
module.exports.changeCounty = changeCounty;
module.exports.getCounty = getCounty;
module.exports.capitalizeFirstLetter = capitalizeFirstLetter;
module.exports.checkFile = checkFile;
module.exports.generateParamsJson = generateParamsJson;
module.exports.appendToGlobalWorkDir = appendToGlobalWorkDir;


