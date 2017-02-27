module.exports = function(vorpal, options) {
    vorpal
        .command('helloSirrrr <type>', 'says hello')
        .action(function(args, cb){
            cb();
        });
}
