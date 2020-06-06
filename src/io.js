const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');
const { writeFileSync } = require('fs');
const readline = require('readline-sync');


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
        return './images/placa carro 1.jpg';
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

// --------------------------------------------------

function roiImage() {
    const content = state.getContent();
    let image = content.image;
    let original = content.imgOriginal;
    let rect = {
        x: Math.trunc(image.cols * 0.20),
        width: Math.trunc(image.cols * 0.60),
        y: Math.trunc(image.rows * 0.35),
        height: Math.trunc(image.rows * 0.50)
    };
    
    // draw
    let point1 = new cv.Point(rect.x, rect.y);
    let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
    const color = new cv.Scalar(0, 255,0);
    cv.rectangle(original, point1, point2, color, 2, cv.LINE_AA, 0);

    // roi
    image = image.roi(rect);

    content.imageRoi = rect;
    content.image = image;
}

// --------------------------------------------------

function outputToFile(outputFile) {
    const content = state.getContent();
    const image = content.image;
    const canvas = createCanvas(image.cols, image.rows);

    cv.imshow(canvas, image);
    writeFileSync(outputFile, canvas.toBuffer('image/jpeg'));
}

function output() {
    const content = state.getContent();
    const image = content.image;
    const outputFile = askOutputFile();
    const canvas = createCanvas(image.cols, image.rows);
    
    cv.imshow(canvas, image);
    writeFileSync(outputFile, canvas.toBuffer('image/jpeg'));

    function askOutputFile() {
        //return readline.question('Image output: ');
        return './out/output.png';
    }
}

function outputOriginal() {
    const content = state.getContent();
    const image = content.imgOriginal;
    const outputFile = askOutputFile();
    const canvas = createCanvas(image.cols, image.rows);
    
    cv.imshow(canvas, image);
    writeFileSync(outputFile, canvas.toBuffer('image/jpeg'));

    function askOutputFile() {
        //return readline.question('Image output: ');
        return './out/output-original.png';
    }
}

function outputRectsFromOriginal(outputDir) {
    const content = state.getContent();
    const image = content.imgOriginal;
    const rects = content.rects;

    for (let i = 0; i < rects.length; ++i) {
        let outputFile = outputDir + '/' + 'outputRect_' + i + '.png';
        let rect = rects[i];
        let canvas = createCanvas(rect.height, rect.width);

        let dst = image.roi(rect);

        cv.imshow(canvas, dst);
        writeFileSync(outputFile, canvas.toBuffer('image/jpeg'));
    }
}

module.exports = {
    read: read,
    resetCurrentImage: resetCurrentImage,
    roiImage,
    output,
    outputOriginal,
    outputToFile,
    outputRectsFromOriginal
}
