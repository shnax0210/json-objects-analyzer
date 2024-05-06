const analyze = require('../Analyzer')

const simpleStatisticTestCases = [
    require('../fixtures/SimpleStatistic/SimpleObjects'),
    require('../fixtures/SimpleStatistic/NestedObjects'),
    require('../fixtures/SimpleStatistic/SimpleArrays'),
    require('../fixtures/SimpleStatistic/ObjectsWithArraysOfPrimitives'),
    require('../fixtures/SimpleStatistic/ObjectsWithArraysOfObjects'),
]

const matchesTestCases = [
    require('../fixtures/Matches/SimpleMatches'),
]

test('Should simple statistic test cases pass', () => {
    checkTestCases(simpleStatisticTestCases);
});

test('Should matches test cases pass', () => {
    checkTestCases(matchesTestCases);
});

function checkTestCases(testCases) {
    testCases.forEach(testCase => {
        console.log("Running test case: ", testCase.name)

        //Given
        const objects = testCase.input

        //When
        const result = analyze(objects, testCase.config);

        //Then
        expect(result).toEqual(expect.arrayContaining(testCase.output));
        expect(result).toHaveLength(testCase.output.length);
    });
}
