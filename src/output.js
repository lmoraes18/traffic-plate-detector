const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const { writeFileSync } = require('fs');
const readline = require('readline-sync');
const state = require('./state.js');

async function output() {
    const content = state.getContent();
    const imageCV = content.imageCV;
    const outputFile = askOutputFile();
    
    const output = cv.Mat.zeros(imageCV.rows, imageCV.cols, cv.CV_8UC3);
    const canvas = createCanvas(imageCV.cols, imageCV.rows);
    
    prepareOutput();
    writeOutput();
    clearData();

    function askOutputFile() {
        //return readline.question('Image output: ');
        return './out/output.png';
    }

    function prepareOutput() {
        cv.imshow(canvas, output);
    }

    function writeOutput() {
        writeFileSync(outputFile, canvas.toBuffer('image/jpeg'));
    }

    function clearData() {
        imageCV.delete();
        output.delete();
        state.setContent({});
    }
}

module.exports = output;