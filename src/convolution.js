const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

// TODO trocar por implementacao manual

function gaussianBlur(size) {
    size = size || 5;
    const content = state.getContent();
    const image = content.image;
    let dst = new cv.Mat();

    let ksize = new cv.Size(size, size);
    cv.GaussianBlur(image, dst, ksize, 0, 0, cv.BORDER_DEFAULT);

    image.delete();
    content.image = dst;
}

function highPassFilter() {
    const content = state.getContent();
    const image = content.image;
    let dst = new cv.Mat();

    const mask =    [0, 1, 0,
                    1, -4, 1,
                    0, 1, 0];
    let M = cv.matFromArray(3, 3, cv.CV_32FC1, mask);
    let anchor = new cv.Point(-1, -1);
    cv.filter2D(image, dst, cv.CV_8U, M, anchor, 0, cv.BORDER_DEFAULT);

    image.delete();
    content.image = dst;
}

module.exports = {
    gaussianBlur: gaussianBlur,
    highPassFilter: highPassFilter
};