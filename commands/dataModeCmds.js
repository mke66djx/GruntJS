var stateEngine = require('../stateEng');
var myCsvModule =require('../Scripts/csvToJSON');
var replaceTemps =require('../Scripts/replaceTemps');
var print =require('../Scripts/print');
var path = require('path');
const fsAutocomplete = require('vorpal-autocomplete-fs');
// var config = stateEngine.config;
var textract = require('textract');
var toPdf = require("office-to-pdf");

var scriptSelect = function(dataItem,dataConfigs)
{
    landUseString = dataItem["LANDUSE"]
    ownerLast_name = dataItem["OWNERLAST"]
    ownerFirst_name = dataItem["OWNERFIRST"]
    propTypeFound = 0

    if(ownerFirst_name && ownerLast_name)
    {
        return dataConfigs.ScriptTemplates.full_name_person[landUseString]
    }

    if((ownerFirst_name && !ownerLast_name) || (!ownerFirst_name && ownerLast_name))
    {
        //If first name exists, check if its a corp- if not corp, address by first name as usual
        if(ownerFirst_name)
        {
            for(var i = 0; i < dataConfigs.Corp_KeyWords.length; i++)
            {
                if (ownerFirst_name.includes(dataConfigs.Corp_KeyWords[i]))
                {
                    return dataConfigs.ScriptTemplates.LLC[landUseString]
                }
            }

            //If it has a number its likely an LLC,partnership etc..
            if (hasNumber(ownerFirst_name))
            {
                return dataConfigs.ScriptTemplates.LLC[landUseString]
            }

            //Addrss by first name script
            return dataConfigs.ScriptTemplates.full_name_person[landUseString]

        }
        else
        {
            //If no first name, use generic, do not want to address with last name(too proper)
            return dataConfigs.ScriptTemplates.generic_person[landUseString]
        }

    }

    // for(var i = 0; i < dataConfigs.NoGo_Keywords.length; i++)
    // {
    //     if (ownerFirst_name.includes(dataConfigs.NoGo_Keywords[i]))
    //     {
    //         noGoFLag = 1
    //     }
    //
    // }



};

function hasNumber(myString) {
    return /\d/.test(myString);
}

module.exports = function(vorpal, options)
{

    vorpal
        .command('manPrint<dataList><configFile>', 'Manual campaign print command. User provides a script template, data file in csv or exel format, and configFile')
        .autocomplete(fsAutocomplete())
        .action(function(args, cb)
        {
            failFlag = 0;
            dataListstatus = [];
            configStatus = [];
            dataListstatus = stateEngine.checkFile(args.dataList)
            configStatus = stateEngine.checkFile(args.configFile)

            //Check if data and config exist
            if (dataListstatus[0] || configStatus[0])
            {
                if(dataListstatus[0]) { console.log('Error: Data File Does Not Exist!') }
                if(configStatus[0]){console.log('Error: Config File Does Not Exist!')}

            }
            else
            {
                myCsvModule.csvToJsonF(dataListstatus[1], function(dataListJson)
                {
                    var dataListJsonIndex = 0;
                    var dataConfigs = require(configStatus[1])

                    dataListLen = dataListJson.length

                    //This function gets run dataListLen times, essentially # of rows in data list
                    var runJob = function(value)
                    {


                        dataListLen = dataListLen -1
                        //console.log("Index",dataListJsonIndex,dataListJson[dataListJsonIndex])


                        // Select script based on listing it. Ex; duplex, triplex, corporation classifications each have dif script
                        selectedScript = scriptSelect(dataListJson[dataListJsonIndex],dataConfigs)

                        console.log(selectedScript)
                        //Check to see if script exists
                        selectecScriptPath = stateEngine.checkFile(selectedScript)

                        //Set timeout calls function every x ms
                        setTimeout(function()
                        {
                            //Get all unique template params from the script, if no error continue with params
                            textract.fromFileWithPath(selectecScriptPath[1], function( error, text )
                            {
                                if(error){
                                    console.log("Error: Extracting Text From Script Template File Failed!");
                                    console.log(error);

                                }
                                else
                                {

                                    //Strip the backets and create an array of template params found(scriptTemplateArr)
                                    var scriptTemplateArr = text.split("{");
                                    scriptTemplateArr.forEach(function (stringValue, index)
                                    {
                                        scriptTemplateArr[index] = stringValue.substring(0, stringValue.indexOf('}'))
                                    });
                                    templateParam_arr = (Array.from(new Set(scriptTemplateArr))).filter(Boolean);

                                    setTimeout(function()
                                    {
                                        jsonParams= {}

                                        tempDocx = stateEngine.appendToGlobalWorkDir("tempDoc.docx");
                                        tempPdf = stateEngine.appendToGlobalWorkDir("tempDoc.pdf");

                                        //console.log("DataCOnfigs",dataConfigs)

                                        //These are the list row params, actual data being used
                                        jsonParams = stateEngine.generateParamsJson(dataListJson[dataListJsonIndex],configStatus[1],templateParam_arr)

                                        dataListJsonIndex = dataListJsonIndex +1;

                                        replaceTemps.replaceAllTemps(selectecScriptPath[1],tempDocx,jsonParams);

                                        setTimeout(function()
                                        {
                                            toPdf(tempDocx);
                                        },1000)

                                        setTimeout(function()
                                        {
                                            print.printSingleFile(tempPdf);
                                            //console.log("Printing jack shit..")
                                        },2000)

                                        if (dataListLen >0){ runJob(dataListLen);}
                                    },2000)
                                }
                            });

                        },1000)

                    };

                    runJob(dataListLen);

                });

            }
            cb();
        });

};