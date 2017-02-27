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
const chalk = Vorpal().chalk;

const use = require('cash')();

const unicorns = Vorpal()
    .delimiter('node~$')
    .use(use)
    .show();





unicorns
    .show();

console.log('\u001b[2J\u001b[0;0H');

