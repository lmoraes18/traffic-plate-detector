const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

async function input() {
    const imgPath = askImage();
    const imageCanvas = await loadImageFromImgPath(imgPath);
    const image = cv.imread(imageCanvas);

    const content = {};
    content.imgPath = imgPath;
    content.imgOriginal = image.clone();
    content.image = image;
    state.setContent(content);

    function askImage() {
        //return readline.question('Image input: ');
        return './images/placa carro 3.jpg';
    }

    async function loadImageFromImgPath(imgPath) {
        return loadImage(imgPath);
    }
}

module.exports = input
