module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'campaignMode':
            return {dev setting};

        case 'dataMode':
            return {prod settings};

        case 'sellMode':
            return {prod settings};

        default:
            return {error or other settings};
    }

};