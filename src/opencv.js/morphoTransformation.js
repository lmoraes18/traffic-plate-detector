const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

function erode(size) {
    const content = state.getContent();
    const image = content.image;
    const dst = new cv.Mat();

    let M = cv.Mat.ones(size, size, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    cv.erode(image, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

    image.delete();
    content.image = dst;
}

function dilate(size) {
    size = size || 5;
    const content = state.getContent();
    const image = content.image;
    const dst = new cv.Mat();

    let M = cv.Mat.ones(size, size, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    cv.dilate(image, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

    image.delete();
    content.image = dst;
}

function open(size) {
    size = size || 5;
    const content = state.getContent();
    const image = content.image;
    const dst = new cv.Mat();

    let M = cv.Mat.ones(size, size, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    cv.morphologyEx(image, dst, cv.MORPH_OPEN, M, anchor, 1,
        cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

    image.delete();
    content.image = dst;
}

function close(size) {
    size = size || 5;
    const content = state.getContent();
    const image = content.image;
    const dst = new cv.Mat();

    let M = cv.Mat.ones(size, size, cv.CV_8U);
    cv.morphologyEx(image, dst, cv.MORPH_CLOSE, M);

    image.delete();
    content.image = dst;
}

module.exports = {
    erode,
    dilate,
    open,
    close
};