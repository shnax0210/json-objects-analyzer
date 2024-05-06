module.exports.name = 'Should handle objects with array of primitives';

module.exports.input = [
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
];

module.exports.config = {addMatches: false}

module.exports.output = [
    {
        "countOfUniqueValues": 4,
        "countOfValues": 4,
        "path": "$",
        "type": "object"
    },
    {
        "countOfUniqueValues": 4,
        "countOfValues": 4,
        "path": "$.roles",
        "type": "array",
        "uniqueValues": [
            {
                "count": 1,
                "type": "array",
                "value": [
                    "admin",
                    "user"
                ]
            },
            {
                "count": 1,
                "type": "array",
                "value": [
                    "user"
                ]
            },
            {
                "count": 1,
                "type": "array",
                "value": []
            },
            {
                "count": 1,
                "isUndefined": true
            }
        ]
    },
    {
        "countOfUniqueValues": 2,
        "countOfValues": 3,
        "path": "$.roles[*]",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 2,
                "type": "primitive",
                "value": "user"
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "admin"
            }
        ]
    }
];