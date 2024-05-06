module.exports.name = 'Should handle simple arrays';

module.exports.input = [
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
];

module.exports.config = {addMatches: false}

module.exports.output = [
    {
        "countOfUniqueValues": 3,
        "countOfValues": 3,
        "path": "$[*]",
        "type": "object"
    },
    {
        "countOfUniqueValues": 3,
        "countOfValues": 3,
        "path": "$[*].fistName",
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
                "value": "Jerry"
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "Jack"
            }
        ]
    },
    {
        "countOfUniqueValues": 2,
        "countOfValues": 3,
        "path": "$[*].lastName",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 2,
                "type": "primitive",
                "value": "Smith"
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "Erickson"
            }
        ]
    },
    {
        "countOfUniqueValues": 2,
        "countOfValues": 3,
        "path": "$[*].middleName",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 2,
                "isUndefined": true
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "Doe"
            }
        ]
    }
];