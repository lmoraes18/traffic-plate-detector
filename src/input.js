const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

async function input() {
    const content = {};
    content.imgPath = askImage();
    content.imageCanvas = await loadImageFromImgPath();
    content.imageInput = createImageCV();
    content.image = content.imageInput;
    state.setContent(content);

    function askImage() {
        //return readline.question('Image input: ');
        return './images/placa carro 1.jpg';
    }

    async function loadImageFromImgPath() {
        return loadImage(content.imgPath);
    }

    function createImageCV() {
        return cv.imread(content.imageCanvas);
    }
}

module.exports = input
