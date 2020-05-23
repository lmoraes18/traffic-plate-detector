const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

// TODO trocar por implementacao manual

async function run() {
    const content = state.getContent();
    const image = content.image;
    let dst = new cv.Mat();

    let ksize = new cv.Size(5, 5);
    cv.GaussianBlur(image, dst, ksize, 0, 0, cv.BORDER_DEFAULT);

    content.image = dst;
}

module.exports = run;