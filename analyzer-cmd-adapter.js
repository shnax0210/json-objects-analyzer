const yargs = require('yargs/yargs');
const fs = require("fs");

const analyze = require('./core/Analyzer/Analyzer')
const { performAndLogDuration } = require("./utils/PerfomanceUtils/PerfomanceUtils");

const argv = yargs(process.argv.slice(2))
    .option('input', {
        alias: 'i',
        description: 'Path to the input json file. The file should contain an array of inputObjects',
        type: 'string',
        demandOption: false
    })
    .option('output', {
        alias: 'o',
        description: 'Path to a file where result should be written. If not provided, the result will be printed to the console',
        type: 'string',
        demandOption: false
    })
    .help()
    .alias('help', 'h').argv;

const pathToInputFile = argv.input;
const pathToOutputFile = argv.output;

console.log("-------------------------");

const inputObjects = JSON.parse(fs.readFileSync(pathToInputFile, 'utf8'));

console.log(`Starting analysis of ${inputObjects.length} objects...`);

const result =  performAndLogDuration(
    () => analyze(inputObjects),
    'Finished analysis');

console.log(`Starting writing results...`);
const resultString = JSON.stringify(result, null, 2);

if (pathToOutputFile) {
    fs.writeFileSync(pathToOutputFile, resultString);
} else {
    console.log(resultString);
}
console.log(`Finished writing results`);

console.log("-------------------------");