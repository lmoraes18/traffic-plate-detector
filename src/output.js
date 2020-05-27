const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const { writeFileSync } = require('fs');
const readline = require('readline-sync');
const state = require('./state.js');

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
    output,
    outputToFile,
    outputRectsFromOriginal
}