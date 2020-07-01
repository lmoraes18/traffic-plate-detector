const cv = require('opencv4nodejs');
const { writeFileSync } = require('fs');
const readline = require('readline-sync');

// ---------------------------------------------
// read

function readImage(file) {
    if (!file) {
        file = readline.question('Image input: ');
    }

    return cv.imread(file);
}

function openVideoCapture(file) {
    if (!file && file != 0) {
        file = readline.question('Video input: ');
    }

    return new cv.VideoCapture(file);
}

function openCamera() {
    return new cv.VideoCapture(0);
}

// ---------------------------------------------
// write

function writeImage(fileOutput, image) {
    if (!fileOutput) {
        fileOutput = readline.question('Image output: ');
    }

    cv.imwrite(fileOutput, image);
}

function openVideoWriter(fileOutput, fourccCode, fps, width, heigh, isColor=true) {
    if (!fileOutput) {
        fileOutput = readline.question('Video output (.avi): ');
    }

    return new cv.VideoWriter(fileOutput, 
        fourccCode, 
        fps,
        new cv.Size(width, heigh),
        isColor)
}

module.exports = {
    readImage, openVideoCapture, openCamera, writeImage, openVideoWriter
}
