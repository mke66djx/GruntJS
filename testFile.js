var path = require('path')
var toPdf = require("office-to-pdf")

toPdf("HelloSampleDocx.docx");


// var textract = require('textract');
//
// var path = require('path');
// textract.fromFileWithPath(path.normalize("/home/edit/GruntJS/work_spaces/data/scriptTemplates/Sacramento/testTemplateLetter.docx"), function( error, text ) {
//     if(error){
//         console.log("Error: Reading Script Template File Failed!");
//     }
//     else{
//         var arr = text.split("{");
//         arr.forEach(function (value, i) {
//            arr[i] = value.substring(0, value.indexOf('}'))
//         });
//         numElements = arr.length;
//         arr = Array.from(new Set(arr));
//         console.log(arr)
//     }
//
// })

// dataListItem = {
//     PARCEL: '272 0040 044 0000',
//     OWNERFIRST: 'Eagles Nest Apartments LLC',
//     OWNERLAST: '',
//     MAILADDRES: '6056 Rutland Dr #1',
//     MAILCITY: 'Carmichael',
//     MAILSTATE: 'CA',
//     MAILZIP: '95608',
//     SITEADDRES: '5737 Angelina Ave',
//     SITECITY: 'Carmichael',
//     SITESTATE: 'CA',
//     SZIPANDZIP: '95608-3760',
//     LANDUSE: 'RES,LOW RISE APTS',
//     USECODE: 'AE0',
//     TOTUNITS: '38',
//     LOTACRES: '0.99',
//     YEARBLT: '1979'
// }
//
// templateParam_arr = ["Owner_First_Name","Owner_Last_Name","Owner_Address"]
//
// configFilePath = path.normalize("C:/Users/admin/Desktop/New folder/GruntJS/work_spaces/data/dataConfigs/Sacramento/Sacramento1.json");
//
// var generateParamsJson = function(templateParam_arr,dataListItem,configFilePath) {
//     var jsonData = {};
//     var dataConfigs = require(configFilePath);
//
//     templateParam_arr.forEach(function(element)
//     {
//         var dataConfigs = require(configFilePath);
//         jsonData[element] = dataListItem[(dataConfigs.Sacramento1[element])];
//     });
//
//     return jsonData;
// };
//
// generateParamsJson(templateParam_arr,dataListItem,configFilePath);

