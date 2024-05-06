function performAndMeasureDuration(func) {
    const start = process.hrtime();
    let result = null;
    let error = null;

    try {
        result = func();
    } catch (ex) {
        error = ex;
    }

    const end = process.hrtime(start);
    const executionDurationMilliseconds = end[0] * 1_000 + end[1] / 1_000_000;

    return [result, error, executionDurationMilliseconds];
}

function performAndLogDuration(func, message) {
    const [result, error, duration] = performAndMeasureDuration(func);

    console.log(`${message} in: ${duration} ms, with result: ${error ? 'error' : 'success'}`);

    if (error) {
        throw error;
    }

    return result;
}

module.exports.performAndMeasureDuration = performAndMeasureDuration;
module.exports.performAndLogDuration = performAndLogDuration;