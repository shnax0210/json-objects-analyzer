module.exports.DEFAULT_CONFIG = {
    takeOnlyUniqueInputs: false,
    maxNumberOfUniqueValues: 10,
    skipRootUniqueValuesFromResult: true,
    skipPathsFromResult: [],
    addMatches: true,

    minNumberOfUniqueValuesToSearchMatches: 2,
    minNumberOfUniqueValuesToSquashValuesInMatches: 10,

    minPercentageOfMatches: 100,
    minPercentageOfDisMatches: 100,

    defaultPatternsOfFieldPathsToSquashValuesInMatches: ['.*Date.*', '.*Time.*'],
    patternsOfFieldPathsToSquashValuesInMatches: []
};
