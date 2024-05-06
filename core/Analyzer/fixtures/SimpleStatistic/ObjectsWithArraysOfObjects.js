module.exports.name = 'Should handle objects with array of primitives';

module.exports.input = [
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
        "path": "$.roles",
        "type": "array",
        "uniqueValues": [
            {
                "count": 2,
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
                "count": 1,
                "type": "array",
                "value": [
                    {
                        "name": "customer"
                    }
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
        "countOfUniqueValues": 3,
        "countOfValues": 5,
        "path": "$.roles[*]",
        "type": "object",
        "uniqueValues": [
            {
                "count": 3,
                "type": "object",
                "value": {
                    "description": "User role",
                    "name": "user"
                }
            },
            {
                "count": 1,
                "type": "object",
                "value": {
                    "description": "Admin role",
                    "name": "admin"
                }
            },
            {
                "count": 1,
                "type": "object",
                "value": {
                    "name": "customer"
                }
            }
        ]
    },
    {
        "countOfUniqueValues": 3,
        "countOfValues": 5,
        "path": "$.roles[*].description",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 3,
                "type": "primitive",
                "value": "User role"
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "Admin role"
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
        "path": "$.roles[*].name",
        "type": "primitive",
        "uniqueValues": [
            {
                "count": 3,
                "type": "primitive",
                "value": "user"
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "admin"
            },
            {
                "count": 1,
                "type": "primitive",
                "value": "customer"
            }
        ]
    }
];