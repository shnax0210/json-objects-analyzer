const jsonpath = require('jsonpath');

const COUNT_OF_MISSES_IS_NOT_APPLICABLE_VALUE = "NOT_APPLICABLE";

function findUniqueValues(array) {
    return Array.from(new Set(array));
}

function findObjectPaths(object) {
    function findPathsAsArrays(object) {
        function adjustArrays(paths) {
            return paths.map(path => path.map(part => isNaN(part) ? part : '*'));
        }

        function removeDuplicates(array) {
            return findUniqueValues(array.map(JSON.stringify)).map(JSON.parse);
        }

        function findAllPathsAsArrays(object) {
            const pathsAllProperties = jsonpath.paths(object, '$..*');
            if (Array.isArray(object)) {
                return pathsAllProperties;
            }

            return [["$"]].concat(pathsAllProperties);
        }

        return removeDuplicates(adjustArrays(findAllPathsAsArrays(object)));
    }

    function transformPathPart(pathPart, pathIndex) {
        if (pathIndex === 0) {
            return pathPart;
        }

        if (pathPart === '*') {
            return "[*]"
        }

        return '.' + pathPart;
    }

    function transformPathParts(pathParts) {
        return pathParts.map(transformPathPart).join('');
    }

    return findPathsAsArrays(object).map(transformPathParts);
}

function findObjectsPaths(objects) {
    return findUniqueValues(objects.map(findObjectPaths).flat());
}

function findPropertyValues(objects, path) {
    return objects.flatMap(object => jsonpath.query(object, path));
}

function determineValueType(value) {
    if (Array.isArray(value)) {
        return "array"
    }

    if (typeof value === "object") {
        return "object"
    }

    return "primitive"
}

function countElements(array) {
    const result = {};

    array.forEach(element => {
        const elementKey = JSON.stringify(element)

        if (!result[elementKey]) {
            result[elementKey] = {
                value: element,
                type: determineValueType(element),
                count: 0
            }
        }

        result[elementKey].count++;
    })

    return Object.values(result);
}

function fetchParentPath(path) {
    if (path.endsWith("[*]")) {
        return path.substring(0, path.length - 3);
    }

    const lastDotIndex = path.lastIndexOf(".");
    if (lastDotIndex < 1) {
        return null;
    }

    return path.substring(0, lastDotIndex);
}

function determineType(uniqueValues) {
    const firstUniqValueTypes = findUniqueValues(uniqueValues.map(value => value.type));
    if (firstUniqValueTypes.length === 1) {
        return firstUniqValueTypes[0]
    }

    return "mixed";
}

function countMisses(path, result) {
    const parentPath = fetchParentPath(path);
    if (!parentPath || !result[parentPath]) {
        return 0;
    }

    if (result[parentPath].type === "array") {
        return COUNT_OF_MISSES_IS_NOT_APPLICABLE_VALUE;
    }

    return result[parentPath].countOfValues - result[path].countOfValues;
}

function countPercentOfMisses(result, path) {
    if (result[path].countOfMisses === COUNT_OF_MISSES_IS_NOT_APPLICABLE_VALUE) {
        return COUNT_OF_MISSES_IS_NOT_APPLICABLE_VALUE;
    }

    return ((result[path].countOfMisses / (result[path].countOfMisses + result[path].countOfValues)) * 100).toFixed(2);
}

function addUniqueValuePercentage(result, path, propertyValues) {
    const countOfMisses = result[path].countOfMisses === COUNT_OF_MISSES_IS_NOT_APPLICABLE_VALUE ? 0 : result[path].countOfMisses;

    result[path].uniqueValues.forEach(value => {
        value.percent = ((value.count / (propertyValues.length + countOfMisses)) * 100).toFixed(2)
    })
}

function isValuePresentForPath(object, path) {
    return jsonpath.query(object, path).length > 0;
}

function areParentsPresentForPaths(object, firstPath, secondPath) {
    return isValuePresentForPath(object, fetchParentPath(firstPath)) === isValuePresentForPath(object, fetchParentPath(secondPath));
}

function isMissesPresent(result) {
    return result.countOfMisses !== 0
        && result.countOfMisses !== COUNT_OF_MISSES_IS_NOT_APPLICABLE_VALUE;
}

function isPositiveCorrelationPresent(objects, firstResult, secondResult) {
    return isMissesPresent(firstResult)
        && isMissesPresent(secondResult)
        && objects.every(object => areParentsPresentForPaths(object, firstResult.path, secondResult.path)
            && isValuePresentForPath(object, firstResult.path) === isValuePresentForPath(object, secondResult.path));
}

function isNegativeCorrelationPresent(objects, firstResult, secondResult) {
    return isMissesPresent(firstResult)
        && isMissesPresent(secondResult)
        && objects.every(object => areParentsPresentForPaths(object, firstResult.path, secondResult.path)
            && isValuePresentForPath(object, firstResult.path) !== isValuePresentForPath(object, secondResult.path));
}

function findPresenceCorrelation(objects, sourceResult, targetResult) {
    if (isPositiveCorrelationPresent(objects, sourceResult, targetResult)) {
        return "POSITIVE_PRESENCE";
    }

    if (isNegativeCorrelationPresent(objects, sourceResult, targetResult)) {
        return "NEGATIVE_PRESENCE";
    }
}

function findCorrelations(objects, sourceResult, targetResult) {
    const correlations = [];

    const presenceCorrelationType = findPresenceCorrelation(objects, sourceResult, targetResult);
    if(presenceCorrelationType) {
        correlations.push({
            targetPath: targetResult.path,
            type: presenceCorrelationType
        });
    }

    return correlations;
}

function addCorrelations(objects, results) {
    results.forEach(sourceResult => {
        sourceResult.correlations = results
            .filter(targetResult => sourceResult.path !== targetResult.path)
            .flatMap(targetResult => findCorrelations(objects, sourceResult, targetResult))
    });
}

function analyze(objects, config = {}) {
    const result = {}
    const paths = findObjectsPaths(objects).sort()

    paths.forEach(path => {
        result[path] = {}

        const propertyValues = findPropertyValues(objects, path);

        result[path].path = path;
        result[path].countOfValues = propertyValues.length;

        const uniqueValues = countElements(propertyValues);
        result[path].type = determineType(uniqueValues)
        result[path].uniqueValues = uniqueValues;
        result[path].countOfUniqueValues = uniqueValues.length;

        result[path].countOfMisses = countMisses(path, result);
        result[path].percentOfMisses = countPercentOfMisses(result, path);

        addUniqueValuePercentage(result, path, propertyValues);
    });

    addCorrelations(objects, Object.values(result));

    if (config.maxNumberOfUniqueValues) {
        Object.values(result).forEach(singleResult => {
            singleResult.uniqueValues = singleResult.uniqueValues
                .sort((result1, result2) => result2.count - result1.count)
                .slice(0, config.maxNumberOfUniqueValues);
        })
    }

    if (config.skipRootUniqueValuesFromResult) {
        delete result[paths[0]].uniqueValues
    }

    if (config.skipPathsFromResult) {
        config.skipPathsFromResult.forEach(path => delete result[path]);
    }

    return Object.values(result)
}

module.exports = analyze;