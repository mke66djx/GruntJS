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
    corpFlag = 0
    noGoFlag = 0
    propTypeFound = 0

    //Check if no-go
    for(var i = 0; i < dataConfigs.NoGo_Keywords.length; i++)
    {
        if (ownerFirst_name.includes(dataConfigs.NoGo_Keywords[i]))
        {
            noGoFLag = 1
        }
    }

    //Check if Corp
    for(var i = 0; i < dataConfigs.Corp_KeyWords.length; i++)
    {
        //console.log("Corp",ownerFirst_name.includes(dataConfigs.Corp_KeyWords[i]))
        if (ownerFirst_name.includes(dataConfigs.Corp_KeyWords[i]))
        {
            corpFlag = 1
        }
    }

    //Check if property type exists
    for(var i = 0; i < dataConfigs.PropertyTypes.length; i++)
    {
        //console.log(landUseString)
        //console.log("Property Type", landUseString.includes(dataConfigs.PropertyTypes[i]))
        if (landUseString.includes(dataConfigs.PropertyTypes[i]))
        {
            propTypeFound = 1
            break;
        }
        else
        {
            propTypeFound = 0
        }

    }

    if (propTypeFound == 0)
    {
        noGoFlag = 1
    }

    //Return template
    if(noGoFlag)
    {
        return dataConfigs.ScriptTemplates.Person["Generic"]
    }

    else if(corpFlag)
    {
        //console.log(dataConfigs.ScriptTemplates.LLC[landUseString])
        return dataConfigs.ScriptTemplates.LLC[landUseString]
    }
    else
    {
        //console.log(dataConfigs.ScriptTemplates.Person[landUseString])
        return dataConfigs.ScriptTemplates.Person[landUseString]
    }

};


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
            if (dataListstatus[0])
            {
                console.log('Error: Data File Does Not Exist!');
                failFlag = 1;
            }

            if (configStatus[0])
            {
                console.log('Error: Config File Does Not Exist!');
                failFlag = 1;
            }

            //If files do not exist do not run
            if(failFlag == 0)
            {
                myCsvModule.csvToJsonF(dataListstatus[1], function(dataListJson)
                {
                    var dataListJsonIndex = 0;
                    var dataConfigs = require(configStatus[1])

                    //console.log("DataListLength",dataListJson.length)
                    dataListLen = dataListJson.length
                    //console.log("DataListLength",dataListLen)

                    var runJob = function(value)
                    {

                        dataListLen = dataListLen -1
                        //console.log("Index",dataListJsonIndex,dataListJson[dataListJsonIndex])
                        selectedScript = scriptSelect(dataListJson[dataListJsonIndex],dataConfigs)

                        selectecScriptPath = stateEngine.checkFile(selectedScript)

                        setTimeout(function()
                        {
                            //Get all unique template params
                             textract.fromFileWithPath(selectecScriptPath[1], function( error, text )
                             {
                                 if(error){
                                     console.log("Error: Extracting Text From Script Template File Failed!");
                                     console.log(error);

                                 }
                                 else
                                 {

                                     var scriptTemplateArr = text.split("{");
                                     //console.log(scriptTemplateArr)
                                     scriptTemplateArr.forEach(function (value, dataListJsonIndex)
                                     {
                                         scriptTemplateArr[dataListJsonIndex] = value.substring(0, value.indexOf('}'))
                                     });

                                     templateParam_arr = (Array.from(new Set(scriptTemplateArr))).filter(Boolean);

                                     setTimeout(function()
                                     {
                                         jsonParams= {}

                                         tempDocx = stateEngine.appendToGlobalWorkDir("tempDoc.docx");
                                         tempPdf = stateEngine.appendToGlobalWorkDir("tempDoc.pdf");

                                         //console.log("DataCOnfigs",dataConfigs)

                                         jsonParams = stateEngine.generateParamsJson(dataListJson[dataListJsonIndex],configStatus[1])

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