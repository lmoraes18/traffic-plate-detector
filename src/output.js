const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const { writeFileSync } = require('fs');
const readline = require('readline-sync');
const state = require('./state.js');

async function output() {
    const content = state.getContent();
    const image = content.image;
    const outputFile = askOutputFile();
    
    const canvas = createCanvas(image.cols, image.rows);
    
    prepareOutput();
    writeOutput();
    clearData();

    function askOutputFile() {
        //return readline.question('Image output: ');
        return './out/output.png';
    }

    function prepareOutput() {
        cv.imshow(canvas, image);
    }

    function writeOutput() {
        writeFileSync(outputFile, canvas.toBuffer('image/jpeg'));
    }

    function clearData() {
        image.delete();
        state.setContent({});
    }
}

module.exports = output;