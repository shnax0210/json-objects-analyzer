const analyze = require('./analyzer')

test('Should handle simple objects', () => {
    //Given
    const objects = [
        {
            fistName: 'John',
            middleName: 'Doe',
            lastName: 'Smith',
        },
        {
            fistName: 'Jack',
            lastName: 'Smith',
        }
    ]

    //When
    const result = analyze(objects);

    //Then
    const expectedResult = [
        {
            "correlations": [],
            "countOfMisses": 0,
            "countOfUniqueValues": 2,
            "countOfValues": 2,
            "path": "$",
            "percentOfMisses": "0.00",
            "type": "object",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "object",
                    "value": {
                        "fistName": "John",
                        "lastName": "Smith",
                        "middleName": "Doe"
                    }
                },
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "object",
                    "value": {
                        "fistName": "Jack",
                        "lastName": "Smith"
                    }
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 0,
            "countOfUniqueValues": 2,
            "countOfValues": 2,
            "path": "$.fistName",
            "percentOfMisses": "0.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "primitive",
                    "value": "John"
                },
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "primitive",
                    "value": "Jack"
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 0,
            "countOfUniqueValues": 1,
            "countOfValues": 2,
            "path": "$.lastName",
            "percentOfMisses": "0.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 2,
                    "percent": "100.00",
                    "type": "primitive",
                    "value": "Smith"
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 1,
            "countOfUniqueValues": 1,
            "countOfValues": 1,
            "path": "$.middleName",
            "percentOfMisses": "50.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "primitive",
                    "value": "Doe"
                }
            ]
        }
    ];
    expect(result).toEqual(expect.arrayContaining(expectedResult));
    expect(result).toHaveLength(expectedResult.length);
});

test('Should handle nested objects', () => {
    //Given
    const objects = [
        {
            address: {
                street: 'Main Street',
                number: 123
            }
        },
        {
            address: {
                street: 'Main Street',
                number: 123
            }
        },
        {
            address: {
                street: 'Main Street',
                number: 125
            }
        },
        {
            address: {
                street: 'Second Street'
            }
        },
        {
            address: {}
        },
        {}
    ]

    //When
    const result = analyze(objects, {skipPathsFromResult: ["$"]});

    //Then
    const expectedResult = [
        {
            "correlations": [],
            "countOfMisses": 1,
            "countOfUniqueValues": 4,
            "countOfValues": 5,
            "path": "$.address",
            "percentOfMisses": "16.67",
            "type": "object",
            "uniqueValues": [
                {
                    "count": 2,
                    "percent": "33.33",
                    "type": "object",
                    "value": {
                        "number": 123,
                        "street": "Main Street"
                    }
                },
                {
                    "count": 1,
                    "percent": "16.67",
                    "type": "object",
                    "value": {
                        "number": 125,
                        "street": "Main Street"
                    }
                },
                {
                    "count": 1,
                    "percent": "16.67",
                    "type": "object",
                    "value": {
                        "street": "Second Street"
                    }
                },
                {
                    "count": 1,
                    "percent": "16.67",
                    "type": "object",
                    "value": {}
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 2,
            "countOfUniqueValues": 2,
            "countOfValues": 3,
            "path": "$.address.number",
            "percentOfMisses": "40.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 2,
                    "percent": "40.00",
                    "type": "primitive",
                    "value": 123
                },
                {
                    "count": 1,
                    "percent": "20.00",
                    "type": "primitive",
                    "value": 125
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 1,
            "countOfUniqueValues": 2,
            "countOfValues": 4,
            "path": "$.address.street",
            "percentOfMisses": "20.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 3,
                    "percent": "60.00",
                    "type": "primitive",
                    "value": "Main Street"
                },
                {
                    "count": 1,
                    "percent": "20.00",
                    "type": "primitive",
                    "value": "Second Street"
                }
            ]
        }
    ];
    expect(result).toEqual(expect.arrayContaining(expectedResult));
    expect(result).toHaveLength(expectedResult.length);
});

test('Should handle simple arrays', () => {
    //Given
    const objects = [
        [
            {
                fistName: 'John',
                middleName: 'Doe',
                lastName: 'Smith',
            },
            {
                fistName: 'Jerry',
                lastName: 'Erickson',
            }
        ],
        [
            {
                fistName: 'Jack',
                lastName: 'Smith',
            }
        ]
    ]

    //When
    const result = analyze(objects);

    //Then
    const expectedResult = [
        {
            "correlations": [],
            "countOfMisses": 0,
            "countOfUniqueValues": 3,
            "countOfValues": 3,
            "path": "$[*]",
            "percentOfMisses": "0.00",
            "type": "object",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "object",
                    "value": {
                        "fistName": "John",
                        "lastName": "Smith",
                        "middleName": "Doe"
                    }
                },
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "object",
                    "value": {
                        "fistName": "Jerry",
                        "lastName": "Erickson"
                    }
                },
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "object",
                    "value": {
                        "fistName": "Jack",
                        "lastName": "Smith"
                    }
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 0,
            "countOfUniqueValues": 3,
            "countOfValues": 3,
            "path": "$[*].fistName",
            "percentOfMisses": "0.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "primitive",
                    "value": "John"
                },
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "primitive",
                    "value": "Jerry"
                },
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "primitive",
                    "value": "Jack"
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 0,
            "countOfUniqueValues": 2,
            "countOfValues": 3,
            "path": "$[*].lastName",
            "percentOfMisses": "0.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 2,
                    "percent": "66.67",
                    "type": "primitive",
                    "value": "Smith"
                },
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "primitive",
                    "value": "Erickson"
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 2,
            "countOfUniqueValues": 1,
            "countOfValues": 1,
            "path": "$[*].middleName",
            "percentOfMisses": "66.67",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "primitive",
                    "value": "Doe"
                }
            ]
        }
    ];
    expect(result).toEqual(expect.arrayContaining(expectedResult));
    expect(result).toHaveLength(expectedResult.length);
});


test('Should handle objects with array of primitives', () => {
    //Given
    const objects = [
        {
            roles: ['admin', 'user'],
        },
        {
            roles: ['user'],
        },
        {
            roles: [],
        },
        {}
    ]

    //When
    const result = analyze(objects, {skipPathsFromResult: ["$"]});

    //Then
    const expectedResult = [
        {
            "correlations": [],
            "countOfMisses": 1,
            "countOfUniqueValues": 3,
            "countOfValues": 3,
            "path": "$.roles",
            "percentOfMisses": "25.00",
            "type": "array",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "25.00",
                    "type": "array",
                    "value": [
                        "admin",
                        "user"
                    ]
                },
                {
                    "count": 1,
                    "percent": "25.00",
                    "type": "array",
                    "value": [
                        "user"
                    ]
                },
                {
                    "count": 1,
                    "percent": "25.00",
                    "type": "array",
                    "value": []
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": "NOT_APPLICABLE",
            "countOfUniqueValues": 2,
            "countOfValues": 3,
            "path": "$.roles[*]",
            "percentOfMisses": "NOT_APPLICABLE",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "33.33",
                    "type": "primitive",
                    "value": "admin"
                },
                {
                    "count": 2,
                    "percent": "66.67",
                    "type": "primitive",
                    "value": "user"
                }
            ]
        }
    ];
    expect(result).toEqual(expect.arrayContaining(expectedResult));
    expect(result).toHaveLength(expectedResult.length);
});

test('Should handle objects with array of objects', () => {
    //Given
    const objects = [
        {
            roles: [
                {
                    name: 'admin',
                    description: 'Admin role',
                },
                {
                    name: 'user',
                    description: 'User role',
                }
            ],
        },
        {
            roles: [
                {
                    name: 'user',
                    description: 'User role',
                }
            ],
        },
        {
            roles: [
                {
                    name: 'user',
                    description: 'User role',
                }
            ],
        },
        {
            roles: [
                {
                    name: 'customer'
                }
            ],
        },
        {
            roles: [],
        },
        {}
    ]

    //When
    const result = analyze(objects, {skipPathsFromResult: ["$"]});

    //Then
    const expectedResult = [
        {
            "correlations": [],
            "countOfMisses": 1,
            "countOfUniqueValues": 4,
            "countOfValues": 5,
            "path": "$.roles",
            "percentOfMisses": "16.67",
            "type": "array",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "16.67",
                    "type": "array",
                    "value": [
                        {
                            "description": "Admin role",
                            "name": "admin"
                        },
                        {
                            "description": "User role",
                            "name": "user"
                        }
                    ]
                },
                {
                    "count": 2,
                    "percent": "33.33",
                    "type": "array",
                    "value": [
                        {
                            "description": "User role",
                            "name": "user"
                        }
                    ]
                },
                {
                    "count": 1,
                    "percent": "16.67",
                    "type": "array",
                    "value": [
                        {
                            "name": "customer"
                        }
                    ]
                },
                {
                    "count": 1,
                    "percent": "16.67",
                    "type": "array",
                    "value": []
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": "NOT_APPLICABLE",
            "countOfUniqueValues": 3,
            "countOfValues": 5,
            "path": "$.roles[*]",
            "percentOfMisses": "NOT_APPLICABLE",
            "type": "object",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "20.00",
                    "type": "object",
                    "value": {
                        "description": "Admin role",
                        "name": "admin"
                    }
                },
                {
                    "count": 3,
                    "percent": "60.00",
                    "type": "object",
                    "value": {
                        "description": "User role",
                        "name": "user"
                    }
                },
                {
                    "count": 1,
                    "percent": "20.00",
                    "type": "object",
                    "value": {
                        "name": "customer"
                    }
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 1,
            "countOfUniqueValues": 2,
            "countOfValues": 4,
            "path": "$.roles[*].description",
            "percentOfMisses": "20.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "20.00",
                    "type": "primitive",
                    "value": "Admin role"
                },
                {
                    "count": 3,
                    "percent": "60.00",
                    "type": "primitive",
                    "value": "User role"
                }
            ]
        },
        {
            "correlations": [],
            "countOfMisses": 0,
            "countOfUniqueValues": 3,
            "countOfValues": 5,
            "path": "$.roles[*].name",
            "percentOfMisses": "0.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "20.00",
                    "type": "primitive",
                    "value": "admin"
                },
                {
                    "count": 3,
                    "percent": "60.00",
                    "type": "primitive",
                    "value": "user"
                },
                {
                    "count": 1,
                    "percent": "20.00",
                    "type": "primitive",
                    "value": "customer"
                }
            ]
        }
    ];
    expect(result).toEqual(expect.arrayContaining(expectedResult));
    expect(result).toHaveLength(expectedResult.length);
});

test('Should find positive correlation of primitive fields presents', () => {
    //Given
    const objects = [
        {
            facebookNickname: 'john',
            facebookId: '123',
        },
        {
            twitterNickname: 'john',
            twitterId: '123',
        }
    ]

    //When
    const result = analyze(objects, {skipPathsFromResult: ["$"]});

    //Then
    const expectedResult = [
        {
            "correlations": [
                {
                    "targetPath": "$.facebookNickname",
                    "type": "POSITIVE_PRESENCE"
                },
                {
                    "targetPath": "$.twitterId",
                    "type": "NEGATIVE_PRESENCE"
                },
                {
                    "targetPath": "$.twitterNickname",
                    "type": "NEGATIVE_PRESENCE"
                }
            ],
            "countOfMisses": 1,
            "countOfUniqueValues": 1,
            "countOfValues": 1,
            "path": "$.facebookId",
            "percentOfMisses": "50.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "primitive",
                    "value": "123"
                }
            ]
        },
        {
            "correlations": [
                {
                    "targetPath": "$.facebookId",
                    "type": "POSITIVE_PRESENCE"
                },
                {
                    "targetPath": "$.twitterId",
                    "type": "NEGATIVE_PRESENCE"
                },
                {
                    "targetPath": "$.twitterNickname",
                    "type": "NEGATIVE_PRESENCE"
                }
            ],
            "countOfMisses": 1,
            "countOfUniqueValues": 1,
            "countOfValues": 1,
            "path": "$.facebookNickname",
            "percentOfMisses": "50.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "primitive",
                    "value": "john"
                }
            ]
        },
        {
            "correlations": [
                {
                    "targetPath": "$.facebookId",
                    "type": "NEGATIVE_PRESENCE"
                },
                {
                    "targetPath": "$.facebookNickname",
                    "type": "NEGATIVE_PRESENCE"
                },
                {
                    "targetPath": "$.twitterNickname",
                    "type": "POSITIVE_PRESENCE"
                }
            ],
            "countOfMisses": 1,
            "countOfUniqueValues": 1,
            "countOfValues": 1,
            "path": "$.twitterId",
            "percentOfMisses": "50.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "primitive",
                    "value": "123"
                }
            ]
        },
        {
            "correlations": [
                {
                    "targetPath": "$.facebookId",
                    "type": "NEGATIVE_PRESENCE"
                },
                {
                    "targetPath": "$.facebookNickname",
                    "type": "NEGATIVE_PRESENCE"
                },
                {
                    "targetPath": "$.twitterId",
                    "type": "POSITIVE_PRESENCE"
                }
            ],
            "countOfMisses": 1,
            "countOfUniqueValues": 1,
            "countOfValues": 1,
            "path": "$.twitterNickname",
            "percentOfMisses": "50.00",
            "type": "primitive",
            "uniqueValues": [
                {
                    "count": 1,
                    "percent": "50.00",
                    "type": "primitive",
                    "value": "john"
                }
            ]
        }
    ];
    expect(result).toEqual(expect.arrayContaining(expectedResult));
    expect(result).toHaveLength(expectedResult.length);
});
