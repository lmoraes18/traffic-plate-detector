const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

// TODO trocar por implementacao manual

async function run() {
    const content = state.getContent();
    const image = content.image;

    cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0);
}

module.exports = run;