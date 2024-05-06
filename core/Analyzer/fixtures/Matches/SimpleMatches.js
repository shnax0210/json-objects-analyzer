module.exports.name = 'Should handle nested objects';

module.exports.input = [
    {
        facebookNickname: 'john',
        facebookId: '123',
    },
    {
        twitterNickname: 'john',
        twitterId: '123',
    }
];

module.exports.config = {}

module.exports.output = [
    {
        "countOfUniqueValues": 2,
        "countOfValues": 2,
        "path": "$",
        "type": "object"
    },
    {
        "countOfUniqueValues": 2,
        "countOfValues": 2,
        "matches": [
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            }
        ],
        "path": "$.facebookId",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 1,
                "type": "primitive",
                "value": "123"
            },
            {
                "count": 1,
                "isUndefined": true
            }
        ]
    },
    {
        "countOfUniqueValues": 2,
        "countOfValues": 2,
        "matches": [
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.facebookNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            }
        ],
        "path": "$.facebookNickname",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 1,
                "type": "primitive",
                "value": "john"
            },
            {
                "count": 1,
                "isUndefined": true
            }
        ]
    },
    {
        "countOfUniqueValues": 2,
        "countOfValues": 2,
        "matches": [
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterId",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            }
        ],
        "path": "$.twitterId",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 1,
                "type": "primitive",
                "value": "123"
            },
            {
                "count": 1,
                "isUndefined": true
            }
        ]
    },
    {
        "countOfUniqueValues": 2,
        "countOfValues": 2,
        "matches": [
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.facebookNickname",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "john"
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            },
            {
                "countOfDisMatches": 1,
                "countOfMatches": 0,
                "percentageOfDisMatches": 100,
                "percentageOfMatches": 0,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "type": "primitive",
                    "value": "123"
                }
            },
            {
                "countOfDisMatches": 0,
                "countOfMatches": 1,
                "percentageOfDisMatches": 0,
                "percentageOfMatches": 100,
                "sourcePath": "$.twitterNickname",
                "sourceValue": {
                    "count": 1,
                    "isUndefined": true
                },
                "targetPath": "$.twitterId",
                "targetValue": {
                    "count": 1,
                    "isUndefined": true
                }
            }
        ],
        "path": "$.twitterNickname",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 1,
                "type": "primitive",
                "value": "john"
            },
            {
                "count": 1,
                "isUndefined": true
            }
        ]
    }
];