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
            return 'campaignMode'
        } else if (answer.theme === 'Data Mode') {
            return 'dataMode'
        } else if (answer.theme === 'Sell Mode') {
            return 'sellMode'
        } else if (answer.theme === 'Exit') {

        }
    });
}