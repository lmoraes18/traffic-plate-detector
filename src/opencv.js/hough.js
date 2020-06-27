const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

function houghLines() {
    const content = state.getContent();
    let image = content.image;

    let linesV = new cv.Mat();
    let linesH = new cv.Mat();

    cv.HoughLines(image, linesV, 5, Math.PI / 180,
        30, 0, 0, Math.PI / 180 * -1, Math.PI / 180 * 1);
    cv.HoughLines(image, linesH, 5, Math.PI / 180,
        30, 0, 0, Math.PI / 180 * 89, Math.PI / 180 * 91);
    
    content.linesV = linesV;
    content.linesH = linesH;
}

function drawLines(newImage) {
    const content = state.getContent();
    let image = content.image;
    let linesV = content.linesV;
    let linesH = content.linesH;

    if (newImage) {
        content.image = image = cv.Mat.zeros(image.rows, image.cols, cv.CV_8UC1);
    }

    draw(linesV);
    draw(linesH);

    function draw(lines) {
        for (let i = 0; i < lines.rows; ++i) {
            let rho = lines.data32F[i * 2];
            let theta = lines.data32F[i * 2 + 1];
            let a = Math.cos(theta);
            let b = Math.sin(theta);
            let x0 = a * rho;
            let y0 = b * rho;
            let startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
            let endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
            cv.line(image, startPoint, endPoint, [255, 0, 0, 255]);
        }
    }
}

module.exports = {
    houghLines,
    drawLines
};