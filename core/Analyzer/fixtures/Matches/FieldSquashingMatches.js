module.exports.name = 'Should squash configured fields and find matches';

module.exports.input = [
    {
        id: 1,
        addressAddingDate: '2023-09-10',
        address: 'Somewhere in cool place',
    },
    {
        id: 2,
        addressAddingDate: '2023-09-20',
        address: 'Somewhere in bad place',
    },
    {
        id: 3,
        addressAddingDate: '2023-09-20',
        address: 'Somewhere in cool place',
    },
    {
        id: 4,
    },
];

module.exports.config = { patternsOfFieldPathsToSquashValuesInMatches: ['.*id', '.*address'] }

module.exports.output = [
    {
        "countOfUniqueValues":4,
        "countOfValues":4,
        "path":"$",
        "type":"object"
    },
    {
        "path":"$.address",
        "type":"primitive",
        "countOfUniqueValues":3,
        "countOfValues":4,
        "uniqueValues":[
            {
                "count":2,
                "type":"primitive",
                "value":"Somewhere in cool place"
            },
            {
                "count":1,
                "type":"primitive",
                "value":"Somewhere in bad place"
            },
            {
                "count":1,
                "isUndefined":true
            }
        ],
        "matches":[
            {
                "countOfDisMatches":4,
                "countOfMatches":0,
                "percentageOfDisMatches":100,
                "percentageOfMatches":0,
                "sourcePath":"$.address",
                "sourceValue":{
                    "count":1,
                    "isUndefined":true
                },
                "targetPath":"$.addressAddingDate",
                "targetValue":{
                    "count":3,
                    "isSquashed":true,
                    "isUndefined":false
                }
            },
            {
                "countOfDisMatches":4,
                "countOfMatches":0,
                "percentageOfDisMatches":100,
                "percentageOfMatches":0,
                "sourcePath":"$.address",
                "sourceValue":{
                    "count":3,
                    "isSquashed":true,
                    "isUndefined":false
                },
                "targetPath":"$.addressAddingDate",
                "targetValue":{
                    "count":1,
                    "isUndefined":true
                }
            }
        ]
    },
    {
        "path":"$.addressAddingDate",
        "type":"primitive",
        "countOfUniqueValues":3,
        "countOfValues":4,
        "uniqueValues":[
            {
                "count":2,
                "type":"primitive",
                "value":"2023-09-20"
            },
            {
                "count":1,
                "type":"primitive",
                "value":"2023-09-10"
            },
            {
                "count":1,
                "isUndefined":true
            }
        ],
        "matches":[
            {
                "countOfDisMatches":4,
                "countOfMatches":0,
                "percentageOfDisMatches":100,
                "percentageOfMatches":0,
                "sourcePath":"$.addressAddingDate",
                "sourceValue":{
                    "count":1,
                    "isUndefined":true
                },
                "targetPath":"$.address",
                "targetValue":{
                    "count":3,
                    "isSquashed":true,
                    "isUndefined":false
                }
            },
            {
                "countOfDisMatches":4,
                "countOfMatches":0,
                "percentageOfDisMatches":100,
                "percentageOfMatches":0,
                "sourcePath":"$.addressAddingDate",
                "sourceValue":{
                    "count":3,
                    "isSquashed":true,
                    "isUndefined":false
                },
                "targetPath":"$.address",
                "targetValue":{
                    "count":1,
                    "isUndefined":true
                }
            }
        ],
    },
    {
        "countOfUniqueValues":4,
        "countOfValues":4,
        "path":"$.id",
        "type":"primitive",
        "uniqueValues":[
            {
                "count":1,
                "type":"primitive",
                "value":1
            },
            {
                "count":1,
                "type":"primitive",
                "value":2
            },
            {
                "count":1,
                "type":"primitive",
                "value":3
            },
            {
                "count":1,
                "type":"primitive",
                "value":4
            }
        ]
    }
];