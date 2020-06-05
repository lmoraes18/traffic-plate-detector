const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

// TODO trocar por implementacao manual

function binary(val) {
    const content = state.getContent();
    const image = content.image;

    cv.threshold(image, image, val, 255, cv.THRESH_BINARY);
}

function toZero(val) {
    const content = state.getContent();
    const image = content.image;

    cv.threshold(image, image, val, 255, cv.THRESH_TOZERO);
}

function toZeroInverted(val) {
    const content = state.getContent();
    const image = content.image;

    cv.threshold(image, image, val, 255, cv.THRESH_TOZERO_INV);
}

function otsu() {
    const content = state.getContent();
    const image = content.image;

    cv.threshold(image, image, 0, 255, cv.THRESH_OTSU);
}

module.exports = {
    binary,
    toZero,
    toZeroInverted,
    otsu
};