module.exports = function(vorpal, options) {
    vorpal
        .command('hello <type>', 'says hello')
        .autocomplete(['there','guy', 'you'])
        .action(function(args, cb){
            console.log("hello")
            cb();
        });
}
