const cv = require('opencv4nodejs');
const config = require('./config');

const MIN_PERIMETER_THRESHOLD = config["perim-min-threshold"];
const MAX_PERIMETER_THRESHOLD = config["perim-max-threshold"];

function findContours(image) {
    const perimeterThreshold = Math.min(image.cols * 1.4 + image.rows * 1.4, MAX_PERIMETER_THRESHOLD)

    let contours = image.findContours(cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
    let result = [];

    for(let i = 0; i < contours.length; i++) {
        const cnt = contours[i];
        const perimeter = cnt.arcLength(true);

        if (perimeter > MIN_PERIMETER_THRESHOLD && perimeter < perimeterThreshold) {
            let tmp = cnt.approxPolyDP(0.03 * perimeter, true);
    
            if (tmp.length == 4) {
                let rect = cnt.boundingRect();
                
                const ratio = rect.height / rect.width;
                if (ratio > 0.29 && ratio < 0.40) { // 0.32 is the ratio in image 1
                    result.push({
                        rect: rect,
                        contour: cnt
                    });
                }
            }
        }
    }

    return result;
}

function drawContours(image, result) {
    const contours = result.map(a => a.contour);
    const color = new cv.Vec(200, 255, 0);

    image.drawContours(contours, color, 0);
}

function drawRects(image, rect) {
    const color = new cv.Vec(200, 255, 0);
    let point1 = new cv.Point(rect.x, rect.y);
    let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
    image.drawRectangle(point1, point2, color);
}

module.exports = {
    findContours,
    drawContours,
    drawRects
}