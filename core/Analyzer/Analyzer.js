const { findPropertyValues, findObjectsPaths } = require("../../utils/PathUtils/PathUtils");
const { findUniqueValues } = require("../../utils/ArrayUtils/ArrayUtils");
const { DEFAULT_CONFIG } = require("./Analyzer.constants");


function determineValueType(value) {
    if (Array.isArray(value)) {
        return "array"
    }

    if (typeof value === "object") {
        return "object"
    }

    return "primitive"
}

function determineType(uniqueValues) {
    const firstUniqValueTypes = findUniqueValues(uniqueValues.filter(value => !value.isUndefined).map(value => value.type));
    if (firstUniqValueTypes.length === 1) {
        return firstUniqValueTypes[0]
    }

    return "mixed";
}

function buildMatchKey(sourceValue, targetValue) {
    return `${JSON.stringify(sourceValue)}-${JSON.stringify(targetValue)}`;
}

function createInitialMatch(sourceResult, sourceValue, targetResult, targetValue) {
    return {
        sourcePath: sourceResult.path,
        sourceValue: sourceValue,
        targetPath: targetResult.path,
        targetValue: targetValue,
        countOfMatches: 0,
    };
}

function createInitialMatches(sourceResult, targetResult) {
    const result = {};

    for (const sourceValue of sourceResult.uniqueValues) {
        for (const targetValue of targetResult.uniqueValues) {
            result[`${buildMatchKey(sourceValue.value, targetValue.value)}`]
                = createInitialMatch(sourceResult, sourceValue, targetResult, targetValue);
        }
    }

    return result;
}

function roundNumber(number, precision) {
    return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
}

function equalValues(value1, value2) {
    return JSON.stringify(value1) === JSON.stringify(value2);
}

function findMatches(objects, sourceResult, targetResult) {
    let matches = createInitialMatches(sourceResult, targetResult);

    for (const object of objects) {
        const sourceValues = findPropertyValues([object], sourceResult.path);
        const targetValues = findPropertyValues([object], targetResult.path);

        for (const sourceValue of sourceValues) {
            for (const targetValue of targetValues) {
                matches[buildMatchKey(sourceValue, targetValue)].countOfMatches++;
            }
        }
    }

    matches = Object.values(matches)

    for (const sourceValue of sourceResult.uniqueValues) {
        const totalNumberOfMatches = matches
            .filter(match => equalValues(match.sourceValue.value, sourceValue.value))
            .map(match => match.countOfMatches)
            .reduce((a, b) => a + b, 0);

        matches
            .filter(match => match.sourceValue.value === sourceValue.value)
            .forEach(match => {
                match.percentageOfMatches = roundNumber(match.countOfMatches / totalNumberOfMatches * 100, 2);

                match.countOfDisMatches = totalNumberOfMatches - match.countOfMatches;
                match.percentageOfDisMatches = roundNumber(match.countOfDisMatches / totalNumberOfMatches * 100, 2);
            });
    }

    return matches;
}

function addMatches(objects, results) {
    results.forEach(sourceResult => {
        const matches = results
            .filter(targetResult => !sourceResult.path.includes(targetResult.path)
                && !targetResult.path.includes(sourceResult.path)
                && (sourceResult.uniqueValues.length > 1 && sourceResult.uniqueValues.length <= 5)
                && (targetResult.uniqueValues.length > 1 && targetResult.uniqueValues.length <= 5))
            .flatMap(targetResult => findMatches(objects, sourceResult, targetResult))

        if(matches.length > 0) {
            sourceResult.matches = matches
        }
    });
}

function countValues(objects, path) {
    const propertyValues = findPropertyValues(objects, path);

    const propertyUniqueValues = Object.values(propertyValues.reduce((result, propertyValue) => {
        const propertyValueAsString = JSON.stringify(propertyValue) || 'undefined';

        if (!result[propertyValueAsString]) {
            result[propertyValueAsString] = { count: 0 };

            if (propertyValue === undefined) {
                result[propertyValueAsString].isUndefined = true;
            } else {
                result[propertyValueAsString].value = propertyValue;
                result[propertyValueAsString].type = determineValueType(propertyValue);
            }
        }

        result[propertyValueAsString].count++;

        return result;
    }, {}))

    return [propertyValues, propertyUniqueValues];
}

function analyze(objects, config = DEFAULT_CONFIG) {
    config = { ...DEFAULT_CONFIG, ...config };

    let results = findObjectsPaths(objects)
        .sort()
        .map(path => {
            const [propertyValues, propertyUniqueValues] = countValues(objects, path);

            return {
                path: path,
                type: determineType(propertyUniqueValues),
                countOfValues: propertyValues.length,
                countOfUniqueValues: propertyUniqueValues.length,
                uniqueValues: propertyUniqueValues,
            };
        });

    if(config.addMatches) {
        addMatches(objects, results);

        results.forEach(singleResult => {
            if(singleResult.matches) {
                singleResult.matches = singleResult.matches.filter(match => match.percentageOfMatches === 100 || match.percentageOfDisMatches === 100);
            }
        })
    }

    if (config.maxNumberOfUniqueValues) {
        results.forEach(singleResult => {
            singleResult.uniqueValues = singleResult.uniqueValues
                .sort((result1, result2) => result2.count - result1.count)
                .slice(0, config.maxNumberOfUniqueValues);
        })
    }

    if (config.skipRootUniqueValuesFromResult) {
        delete results[0].uniqueValues;
    }

    if (config.skipPathsFromResult) {
        results = results.filter(result => !config.skipPathsFromResult.includes(result.path));
    }

    return results
}

module.exports = analyze;