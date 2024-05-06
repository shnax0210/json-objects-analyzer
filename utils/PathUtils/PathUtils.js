const { findUniqueValues } = require("../ArrayUtils/ArrayUtils");

const jsonpath = require("jsonpath");

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

function findPropertyValues(objects, path) {
    const propertyValues = objects.flatMap(object => jsonpath.query(object, path));

    const parentPath = fetchParentPath(path);
    if (!parentPath) {
        return propertyValues;
    }

    const parentPropertyValues = objects.flatMap(object => jsonpath.query(object, parentPath));

    if (parentPropertyValues.length > propertyValues.length) {
        return propertyValues.concat(Array(parentPropertyValues.length - propertyValues.length).fill(undefined));
    }

    return propertyValues;
}

module.exports.findObjectsPaths = findObjectsPaths;
module.exports.findPropertyValues = findPropertyValues;