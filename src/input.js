const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

async function read() {
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

function resetCurrentImage() {
    const content = state.getContent();
    const imgOriginal = content.imgOriginal;

    content.image.delete();
    content.image = imgOriginal.clone();
}

module.exports = {
    read: read,
    resetCurrentImage: resetCurrentImage
}
