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

    rgbToGray();
    //await histogram.equalize();
    threshold();      // binarizar
    blur();           // tirar ruidos da imagem

    contours.findContours();
    contours.drawContours();

    output.output();
    state.clear();
}

start();
