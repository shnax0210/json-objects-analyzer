module.exports.name = 'Should handle nested objects';

module.exports.input = [
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
];

module.exports.config = { addMatches: false }

module.exports.output = [
    {
        "countOfUniqueValues": 5,
        "countOfValues": 6,
        "path": "$",
        "type": "object"
    },
    {
        "countOfUniqueValues": 5,
        "countOfValues": 6,
        "path": "$.address",
        "type": "object",
        "uniqueValues": [
            {
                "count": 2,
                "type": "object",
                "value": {
                    "number": 123,
                    "street": "Main Street"
                }
            },
            {
                "count": 1,
                "type": "object",
                "value": {
                    "number": 125,
                    "street": "Main Street"
                }
            },
            {
                "count": 1,
                "type": "object",
                "value": {
                    "street": "Second Street"
                }
            },
            {
                "count": 1,
                "type": "object",
                "value": {}
            },
            {
                "count": 1,
                "isUndefined": true
            }
        ]
    },
    {
        "countOfUniqueValues": 3,
        "countOfValues": 5,
        "path": "$.address.number",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 2,
                "type": "primitive",
                "value": 123
            },
            {
                "count": 2,
                "isUndefined": true
            },
            {
                "count": 1,
                "type": "primitive",
                "value": 125
            }
        ]
    },
    {
        "countOfUniqueValues": 3,
        "countOfValues": 5,
        "path": "$.address.street",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 3,
                "type": "primitive",
                "value": "Main Street"
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "Second Street"
            },
            {
                "count": 1,
                "isUndefined": true
            }
        ]
    }
];