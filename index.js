const state = require('./src/state.js');
const setup = require('./src/setup.js');
const io = require('./src/io.js');

const rgbToGray = require('./src/rgbToGray.js');
const histogram = require('./src/histogram.js');
const threshold = require('./src/threshold.js');
const convolution = require('./src/convolution.js');
const contours = require('./src/contours.js');
const morphoTransformation = require('./src/morphoTransformation.js');

async function start() {
    await setup();
    await io.read();

    const content = state.getContent();

    io.roiImage();
    rgbToGray();

    convolution.highPassFilter();
    threshold.otsu();

    // implementar houghs

    

    // contours.findContours();
    // contours.drawContours();
    // contours.drawRects();

    const rects = content.rects;
    console.log("encontrados " + rects.length + " candidatos");
    io.output();
    io.outputOriginal();
    //output.outputRectsFromOriginal('./out');
    state.clear();
}

start();
