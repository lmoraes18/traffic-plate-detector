const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

// TODO trocar por implementacao manual

async function run() {
    const content = state.getContent();
    const image = content.image;

    cv.threshold(image, image, 100, 255, cv.THRESH_BINARY);
}

module.exports = run;