function findUniqueValues(array) {
    return Array.from(new Set(array));
}

function findUniqueObjects(array) {
    return findUniqueValues(array.map(item => JSON.stringify(item))).map(item => JSON.parse(item));
}

module.exports.findUniqueValues = findUniqueValues;
module.exports.findUniqueObjects = findUniqueObjects;