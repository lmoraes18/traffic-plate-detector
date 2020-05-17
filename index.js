const state = require('./src/state.js');
const setup = require('./src/setup.js');
const input = require('./src/input.js');
const output = require('./src/output.js');

async function start() {
    await setup();

    await input();

    await output();
}

start();
