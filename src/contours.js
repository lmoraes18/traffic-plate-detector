const { Canvas, createCanvas, Image, ImageData, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');
const { writeFileSync } = require('fs');

function findContours() {
    const content = state.getContent();
    const image = content.image;

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    let rects = [];

    cv.findContours(image, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
    
    for(let i = 0; i < contours.size(); i++) {
        const cnt = contours.get(i);
        const perimeter = cv.arcLength(cnt, true);

        if (perimeter > 70) {
            let tmp = new cv.Mat();
            cv.approxPolyDP(cnt, tmp, 0.03 * perimeter, true);
    
            if (tmp.size().width * tmp.size().height == 4) {
                let rect = cv.boundingRect(cnt);
                
                const ratio = rect.height / rect.width;
                if (ratio > 0.29 && ratio < 0.35) { // 0.32 is the ratio in image 1
                    rects.push(rect);
                }

            }
        }
    }
    
    content.contours = contours;
    content.hierarchy = hierarchy;
    content.rects = rects;
}

function drawContours() {
    const content = state.getContent();
    const image = content.image;
    const contours = content.contours;
    const hierarchy = content.hierarchy;
    const color = new cv.Scalar(200, 255,0);

    for (let i = 0; i < contours.size(); ++i) {
        cv.drawContours(image, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    }
}

function drawContoursEmptyImage(outputFile) {
    outputFile = outputFile || './out/output_contours.png';

    const dst2 = cv.Mat.zeros(image.rows, image.cols, cv.CV_8UC3);
    const color = new cv.Scalar(200, 255,0);
    for (let i = 0; i < contours.size(); ++i) {
        cv.drawContours(dst2, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    }

    const canvas = createCanvas(image.cols, image.rows);
    cv.imshow(canvas, dst2);
    writeFileSync(outputFile, canvas.toBuffer('image/jpeg'));
    canvas.delete();
}

function drawRects() {
    const content = state.getContent();
    const image = content.image;
    const rects = content.rects;
    const color = new cv.Scalar(200, 0, 0);

    for (let i = 0; i < rects.length; ++i) {
        let rect = rects[i];
        let point1 = new cv.Point(rect.x, rect.y);
        let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
        cv.rectangle(image, point1, point2, color, 2, cv.LINE_AA, 0);
    }
}

module.exports = {
    findContours,
    drawContours,
    drawContoursEmptyImage,
    drawRects
}