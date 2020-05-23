const state = require('./src/state.js');
const setup = require('./src/setup.js');
const input = require('./src/input.js');
const output = require('./src/output.js');

const rgbToGray = require('./src/rgbToGray.js');
const histogram = require('./src/histogram.js');
const threshold = require('./src/threshold.js');
const blur = require('./src/blur.js');
const contours = require('./src/contours.js');

async function start() {
    await setup();
    await input();

    await rgbToGray();
    //await histogram.equalize();
    await threshold();      // binarizar
    await blur();           // tirar ruidos da imagem

    await contours();

    await output();
}

start();
