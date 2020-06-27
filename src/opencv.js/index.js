const state = require('./src/state.js');
const setup = require('./src/setup.js');
const io = require('./src/io.js');

const rgbToGray = require('./src/rgbToGray.js');
const histogram = require('./src/histogram.js');
const threshold = require('./src/threshold.js');
const convolution = require('./src/convolution.js');
const contours = require('./src/contours.js');
const morphoTransformation = require('./src/morphoTransformation.js');
const hough = require('./src/hough.js');

function thresholdOtsu() {
    threshold.otsu();
    convolution.gaussianBlur(5);
    morphoTransformation.close(3);
}

function thresholdAdaptative() {
    threshold.adaptative(9, 5);
}

function thresholdHighFilter() {
    convolution.highPassFilter();
    convolution.gaussianBlur(5);
    morphoTransformation.close(3);
    threshold.otsu();
}

function tryContours() {
    contours.findContours();

    const content = state.getContent();
    return content.rects.length;
    // contours.drawContours();
    // contours.drawRects();
}

function finish(imagem) {
    const content = state.getContent();
    const rects = content.rects;
    console.log("encontrados " + rects.length + " candidatos para imagem " + imagem);

    contours.drawRects();
    // io.output();
    io.outputOriginal();
    let imagemName = imagem.substring(imagem.lastIndexOf('/')+1, imagem.lastIndexOf('.'))
    io.outputToFile('./out/output_' + imagemName + '.png')
    state.clear();
}

function finishUnsucessful(imagem) {
    console.log("placa nao encontrada para imagem " + imagem);
    state.clear();
}

async function runImage(image) {
    await io.read(image);
    io.roiImage();
    rgbToGray();

    state.pushImage();

    // try otsu
    thresholdOtsu();
    if (tryContours() > 0) {
        finish(image);
        return;
    }

    // try thresholdAdaptative
    state.popImage();
    state.pushImage();
    thresholdAdaptative();
    if (tryContours() > 0) {
        finish(image);
        return;
    }

    // try thresholdHighFilter
    state.popImage();
    state.pushImage();
    thresholdHighFilter();
    if (tryContours() > 0) {
        finish(image);
        return;
    }

    finishUnsucessful(image);
}

async function start() {
    await setup();

    cv.VideoCapture('HTMLVideoElement')
    
    // await runImage('./input/images/placa carro 1.jpg');
    // await runImage('./input/images/placa carro 2.jpg');
    // await runImage('./input/images/placa carro 3.jpg');
    // await runImage('./input/images/placa carro 4.jpg');
    // await runImage('./input/images/placa carro 5.jpg');
    // await runImage('./input/images/placa carro 6.jpg');
    // await runImage('./input/images/placa carro 7.jpg');
}

start();
