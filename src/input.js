const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

async function input() {
    const content = {};
    content.imgPath = askImage();
    content.image = await loadImageFromImgPath();
    content.imageCV = createImageCV();
    state.setContent(content);

    function askImage() {
        //return readline.question('Image input: ');
        return './images/apenas placa.jpg';
    }

    async function loadImageFromImgPath() {
        return loadImage(content.imgPath);
    }

    function createImageCV() {
        return cv.imread(content.image);
    }
}

module.exports = input
