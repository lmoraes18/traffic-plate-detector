const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

// TODO trocar por implementacao manual

function binary(val) {
    const content = state.getContent();
    const image = content.image;

    cv.threshold(image, image, val, 255, cv.THRESH_BINARY);
}

function binaryInv(val) {
    const content = state.getContent();
    const image = content.image;

    cv.threshold(image, image, val, 255, cv.THRESH_BINARY_INV);
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

function adaptative(blockSize, C) {
    const content = state.getContent();
    const image = content.image;

    cv.adaptiveThreshold(image, image, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, blockSize, C);
}

module.exports = {
    binary,
    binaryInv,
    toZero,
    toZeroInverted,
    otsu,
    adaptative
};