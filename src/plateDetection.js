const cv = require('opencv4nodejs');
const misc = require('./src/misc');

function processFrame(frame) {
    let roi = misc.roi(originalImage);
    roi = roi.cvtColor(cv.COLOR_RGBA2GRAY)

    let rects = tryOtsu(roi);
    if (rects.length == 0) {
        rects = tryThresholdAdaptative(roi);
        if (rects.length == 0) {
            rects == tryThresholdHighFilter(roi);
        }
    }
    
    return rects;
}

function tryOtsu(roi) {
    // TODO
    return [];
}

function tryThresholdAdaptative(roi) {
    // TODO
    return [];
}

function tryThresholdHighFilter(roi) {
    // TODO
    return [];
}

module.exports = {
    processFrame
}