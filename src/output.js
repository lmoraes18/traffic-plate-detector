const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const { writeFileSync } = require('fs');
const readline = require('readline-sync');
const state = require('./state.js');

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

function outputToFile(outputFile) {
    const content = state.getContent();
    const image = content.image;
    const canvas = createCanvas(image.cols, image.rows);

    cv.imshow(canvas, image);
    writeFileSync(outputFile, canvas.toBuffer('image/jpeg'));
}

module.exports = {
    output,
    outputToFile
}