const { getPathDeep } = require('../PathUtils')

describe('PathUtils test - test path deep determination', () => {
    test('Should get 1', () => {
        const result = getPathDeep("$")

        expect(result).toEqual(1);
    });

    test('Should get 2', () => {
        const result = getPathDeep("$[*]")

        expect(result).toEqual(2);
    });

    test('Should get 3', () => {
        const result = getPathDeep("$[*].property1")

        expect(result).toEqual(3);
    });
});