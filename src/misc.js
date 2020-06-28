const cv = require('opencv4nodejs');
const config = require('./config');

const ROI_TOP       = config["roi-top"];
const ROI_LEFT      = config["roi-left"];
const ROI_HEIGHT    = config["roi-height"];
const ROI_WIDTH     = config["roi-width"];

function getRoiOffset(frame) {
    return new cv.Rect(
        Math.trunc(frame.cols * ROI_LEFT), 
        Math.trunc(frame.rows * ROI_TOP),
        Math.trunc(frame.cols * ROI_WIDTH), 
        Math.trunc(frame.rows * ROI_HEIGHT))
}

function roi(frame) {
    let rect = getRoiOffset(frame);
    return frame.getRegion(rect);
}

function denoise(frame) {
    return cv.fastNlMeansDenoisingColored(frame)
}

module.exports = {
    getRoiOffset,
    roi,
    denoise
}