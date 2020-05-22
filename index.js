const state = require('./src/state.js');
const setup = require('./src/setup.js');
const input = require('./src/input.js');
const output = require('./src/output.js');

const rgbToGray = require('./src/rgbToGray.js');
const threshold = require('./src/threshold.js');

async function start() {
    await setup();
    await input();

    await rgbToGray();
    await threshold();

    await output();
}

start();
