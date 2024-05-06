module.exports.name = 'Should handle simple objects';

module.exports.input = [
    {
        fistName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
    },
    {
        fistName: 'Jack',
        lastName: 'Smith',
    }
];

module.exports.config = { addMatches: false }

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
        "path": "$.fistName",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 1,
                "type": "primitive",
                "value": "John"
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "Jack"
            }
        ]
    },
    {
        "countOfUniqueValues": 1,
        "countOfValues": 2,
        "path": "$.lastName",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 2,
                "type": "primitive",
                "value": "Smith"
            }
        ]
    },
    {
        "countOfUniqueValues": 2,
        "countOfValues": 2,
        "path": "$.middleName",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 1,
                "type": "primitive",
                "value": "Doe"
            },
            {
                "count": 1,
                "isUndefined": true
            }
        ]
    }
];