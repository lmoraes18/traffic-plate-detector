const yargs = require('yargs');

const argv = yargs
    .usage('$0 [args]')
    .option('input-mode', {
        description: 'Input mode for processing',
        alias: 'm',
        type: 'string',
        required: true,
        demandOption: true,
        choices: ['image', 'video', 'camera']
    })
    .option('input', {
        description: 'Input file for processing',
        alias: 'i',
        type: 'string',
    })
    .option('output', {
        description: 'output result to file',
        alias: 'o',
        type: 'string'
    })
    .option('debug', {
        description: 'debug algoritm',
        alias: 'd',
        type: 'boolean',
        default: false
    })
    .option('roi-top', {
        description: 'Sets the top of the area of interest (in %)',
        type: 'number',
        default: 35,
        coerce: (val) => val / 100.0,
    })
    .option('roi-left', {
        description: 'Sets the left of the area of interest (in %)',
        type: 'number',
        default: 20,
        coerce: (val) => val / 100.0,
    })
    .option('roi-height', {
        description: 'Sets the height of the area of interest (in %)',
        type: 'number',
        default: 50,
        coerce: (val) => val / 100.0,
    })
    .option('roi-width', {
        description: 'Sets the width of the area of interest (in %)',
        type: 'number',
        default: 60,
        coerce: (val) => val / 100.0,
    })
    .option('perim-min-threshold', {
        description: 'Sets the min threshold for rectagles perimeter',
        type: 'number',
        default: 70
    })
    .option('perim-max-threshold', {
        description: 'Sets the max threshold for rectagles perimeter',
        type: 'number',
        default: 800
    })
    .help()
    .alias('help', 'h')
    .argv;

module.exports = argv;