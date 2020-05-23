const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');
const { writeFileSync } = require('fs');

async function run() {
    const content = state.getContent();
    const image = content.image;

    //let dst = new cv.Mat();
   // cv.Canny(image, dst, 50, 100, 3, false);

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.findContours(image, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_NONE);
    content.contours = contours;

    drawContours();
    function drawContours() {
        let dst2 = cv.Mat.zeros(image.rows, image.cols, cv.CV_8UC3);
        
        for (let i = 0; i < contours.size(); ++i) {
            let color = new cv.Scalar(200, 255,0);
            
            cv.drawContours(dst2, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
            cv.drawContours(image, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
        }

        const canvas = createCanvas(image.cols, image.rows);
        cv.imshow(canvas, image);
        cv.imshow(canvas, dst2);
        writeFileSync('./out/output_contours.png', canvas.toBuffer('image/jpeg'));
    }

}

module.exports = run;