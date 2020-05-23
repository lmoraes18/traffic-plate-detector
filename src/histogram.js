const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

// TODO trocar por implementacao manual

async function equalize() {
    const content = state.getContent();
    const image = content.image;

    cv.equalizeHist(image, image);
}

module.exports = {
    equalize
}