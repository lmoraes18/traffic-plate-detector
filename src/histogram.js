const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

// TODO trocar por implementacao manual

function equalize() {
    const content = state.getContent();
    const image = content.image;

    cv.equalizeHist(image, image);
}

function findPercValueThreshold(perc) {
    const content = state.getContent();
    const image = content.image;
    const imgPixels = image.rows * image.cols;

    let hist = findHistogram();
    let s = 0, i = 0;
    for(; i < 256; i++){
        s += hist[i];
        if (s/imgPixels >= perc) break;
    }

    return i;
}

function findHistogram() {
    const content = state.getContent();
    const image = content.image;

    let srcVec = new cv.MatVector();
    srcVec.push_back(image);
    let accumulate = false;
    let channels = [0];
    let histSize = [256];
    let ranges = [0, 255];
    let hist = new cv.Mat();
    let mask = new cv.Mat();
    cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);

    let res = [];
    for(let i = 0; i < 256; i++) {
        res.push(hist.data32F[i]);
    }

    srcVec.delete(); mask.delete(); hist.delete();
    return res;
}

module.exports = {
    equalize,
    findPercValueThreshold,
    findHistogram
}