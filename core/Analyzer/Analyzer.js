const {findPropertyValues, findObjectsPaths, getPathDeep} = require("../../utils/PathUtils/PathUtils");
const {findUniqueValues, findUniqueObjects} = require("../../utils/ArrayUtils/ArrayUtils");
const {DEFAULT_CONFIG} = require("./Analyzer.constants");

const SQUASHED_VALUE_KEY = "SQUASHED";

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

function buildMatchKey(sourceKey, targetKey) {
    return `${JSON.stringify(sourceKey)}-${JSON.stringify(targetKey)}`;
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

function createInitialMatches(sourceResult, sourceUniqueValues, targetResult, targetUniqueValues) {
    const result = {};

    for (const sourceValue of sourceUniqueValues) {
        for (const targetValue of targetUniqueValues) {
            const sourceKey = sourceValue.isSquashed ? SQUASHED_VALUE_KEY : sourceValue.value;
            const targetKey = targetValue.isSquashed ? SQUASHED_VALUE_KEY : targetValue.value;

            result[buildMatchKey(sourceKey, targetKey)] = createInitialMatch(sourceResult, sourceValue, targetResult, targetValue);
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

function squashValuesIfNeeded(result, config) {
    function isFieldMatchedAsNeededForSquash(result, config) {
        function isFieldMatched(path, patterns) {
            return patterns.some(pattern => path.match(new RegExp(pattern)));
        }

        return isFieldMatched(result.path, config.defaultPatternsOfFieldPathsToSquashValuesInMatches)
            || isFieldMatched(result.path, config.patternsOfFieldPathsToSquashValuesInMatches)
    }

    const isSquashValuesNeeded = result.uniqueValues.length >= config.minNumberOfUniqueValuesToSquashValuesInMatches
        || isFieldMatchedAsNeededForSquash(result, config);

    if (!isSquashValuesNeeded) {
        return [isSquashValuesNeeded, result.uniqueValues]
    }

    const undefinedValue = result.uniqueValues.find(uniqueValue => uniqueValue.isUndefined)

    if (!undefinedValue) {
        return [isSquashValuesNeeded, []]
    }

    return [isSquashValuesNeeded, [
        undefinedValue,
        {
            count: result.countOfValues - undefinedValue.count,
            isUndefined: false,
            isSquashed: true,
        }
    ]]
}

function findMatches(objects, sourceResult, targetResult, config) {
    const [isSourceValuesSquashed, sourceUniqueValues] = squashValuesIfNeeded(sourceResult, config)
    const [isTargetValuesSquashed, targetUniqueValues] = squashValuesIfNeeded(targetResult, config)

    if (sourceUniqueValues.length === 0 || targetUniqueValues.length === 0) {
        return [];
    }

    let matches = createInitialMatches(sourceResult, sourceUniqueValues, targetResult, targetUniqueValues);

    for (const object of objects) {
        const sourceValues = findPropertyValues([object], sourceResult.path);
        const targetValues = findPropertyValues([object], targetResult.path);

        for (const sourceValue of sourceValues) {
            for (const targetValue of targetValues) {
                const sourceKey = isSourceValuesSquashed && sourceValue !== undefined ? SQUASHED_VALUE_KEY : sourceValue;
                const targetKey = isTargetValuesSquashed && targetValue !== undefined ? SQUASHED_VALUE_KEY : targetValue;

                matches[buildMatchKey(sourceKey, targetKey)].countOfMatches++;
            }
        }
    }

    matches = Object.values(matches)

    for (const sourceValue of sourceUniqueValues) {
        const matchesWithSourceValue = matches.filter(
            match => (match.sourceValue.isSquashed === true && sourceValue.isSquashed === true)
                || equalValues(match.sourceValue.value, sourceValue.value));

        const totalNumberOfMatches = matchesWithSourceValue.map(match => match.countOfMatches).reduce((a, b) => a + b, 0);

        matchesWithSourceValue.forEach(match => {
            match.percentageOfMatches = roundNumber(match.countOfMatches / totalNumberOfMatches * 100, 2);

            match.countOfDisMatches = totalNumberOfMatches - match.countOfMatches;
            match.percentageOfDisMatches = roundNumber(match.countOfDisMatches / totalNumberOfMatches * 100, 2);
        });
    }

    return matches;
}

function addMatches(objects, results, config) {
    results.forEach(sourceResult => {
        const matches = results
            .filter(targetResult =>
                ((sourceResult.path !== targetResult.path && getPathDeep(sourceResult.path) === getPathDeep(targetResult.path))
                    || (!sourceResult.path.includes(targetResult.path) && !targetResult.path.includes(sourceResult.path)))
                && sourceResult.uniqueValues.length >= config.minNumberOfUniqueValuesToSearchMatches
                && targetResult.uniqueValues.length >= config.minNumberOfUniqueValuesToSearchMatches)
            .flatMap(targetResult => findMatches(objects, sourceResult, targetResult, config))

        if (matches.length > 0) {
            sourceResult.matches = matches
        }
    });
}

function countValues(objects, path) {
    function createUniqueValue(propertyValue) {
        const result = {count: 0};

        if (propertyValue === undefined) {
            result.isUndefined = true;
        } else {
            result.value = propertyValue;
            result.type = determineValueType(propertyValue);
        }

        return result;
    }

    const propertyValues = findPropertyValues(objects, path);

    const propertyUniqueValues = Object.values(propertyValues.reduce((result, propertyValue) => {
        const propertyValueAsString = JSON.stringify(propertyValue) || 'undefined';

        if (!result[propertyValueAsString]) {
            result[propertyValueAsString] = createUniqueValue(propertyValue);
        }

        result[propertyValueAsString].count++;

        return result;
    }, {}))

    return [propertyValues, propertyUniqueValues];
}

function analyze(objects, config = DEFAULT_CONFIG) {
    config = {...DEFAULT_CONFIG, ...config};

    if (config.takeOnlyUniqueInputs) {
        objects = findUniqueObjects(objects)
    }

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

    if (config.addMatches) {
        addMatches(objects, results, config);

        results.forEach(singleResult => {
            if (singleResult.matches) {
                singleResult.matches = singleResult.matches
                    .filter(match => match.percentageOfMatches >= config.minPercentageOfMatches
                        || match.percentageOfDisMatches === config.minPercentageOfDisMatches);
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