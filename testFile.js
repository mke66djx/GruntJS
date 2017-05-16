// /**
//  * Created by edit on 2/24/17.
//  */
// const Vorpal = require('vorpal');
// const inquirer = require('inquirer');
// var config = require('config');
//
// const mainScreenVorpal = new Vorpal();
// const campaignModeVorpal = new Vorpal();
// const dataModeVorpal =  new Vorpal();
//
// mainScreenVorpal
//     .delimiter('home-mode~>')
//     .use(require('./commands/campaignModeCmds'));
//
// campaignModeVorpal
//     .delimiter('campaign-mode~>')
//     .use(requir
//
// e('./commands/campaignModeCmds'));
//
// dataModeVorpal
//     .delimiter('data-mode~>')
//     .use(require('./commands/dataModeCmds'));
//
//
// mainScreenVorpal
//     .show();

const Vorpal = require('vorpal');
//const cash = require('cash')();


const unicorns = new Vorpal()
    .delimiter('uni~$')
    //.use(cash)
    .use()
    .show();

const chalk = new Vorpal()
     .use()
    .show();


