const cv = require('opencv4nodejs');
const config = require('./config');
const misc = require('./misc');
const contours = require('./contours');

const THRESHOLD_METHODS = config.thresholdMethods;

function processFrame(frame) {
    let roi = misc.roi(frame);
    roi = roi.cvtColor(cv.COLOR_RGBA2GRAY)

    let c = []
    
    if (THRESHOLD_METHODS.find(v => v == 'otsu' || v == 'all')) {
        tryOtsu(roi).forEach(v => c.push(v));
    }

    if (THRESHOLD_METHODS.find(v => v == 'otsu-morph' || v == 'all')) {
        tryOtsuMorphClose(roi).forEach(v => c.push(v));
    }

    if (THRESHOLD_METHODS.find(v => v == 'simpleBorderFilter' || v == 'all')) {
        tryThresholdHighFilter(roi).forEach(v => c.push(v));
    }

    if (THRESHOLD_METHODS.find(v => v == 'simpleAdaptative' || v == 'all')) {
        tryThresholdAdaptative(roi).forEach(v => c.push(v));
    }

    if (THRESHOLD_METHODS.find(v => v == 'canny' || v == 'all')) {
        tryCanny(roi).forEach(v => c.push(v));
    }
    
    return c;
}

function tryOtsu(roi) {
    let otsu = roi.threshold(0, 255, cv.THRESH_OTSU);
    if (config.debug) debugImage('otsu-otsu', otsu);

    return contours.findContours(otsu);
}

function tryOtsuMorphClose(roi) {
    let otsu = roi.threshold(0, 255, cv.THRESH_OTSU);
    if (config.debug) debugImage('otsu-otsu', otsu);

    const blur = otsu.gaussianBlur(new cv.Size(5, 5), 1.2);
    if (config.debug) debugImage('otsu-blur', blur);

    const morpho = blur.morphologyEx(new cv.Mat(5, 5, cv.CV_8U, 1), cv.MORPH_CLOSE, new cv.Point(-1, -1),
            1, cv.BORDER_CONSTANT)
    if (config.debug) debugImage('otsu-morpho', morpho);

    return contours.findContours(morpho);
}

function tryThresholdAdaptative(roi) {
    let adapt = roi.adaptiveThreshold(255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 9, 5);
    if (config.debug) debugImage('adaptative', adapt)

    return contours.findContours(adapt);
}

function tryThresholdHighFilter(roi) {
    // highFilter
    let mask = new cv.Mat([
        [0, -1, 0],
        [-1, 4, -1],
        [0, -1, 0],
    ], cv.CV_32FC1);
    let borders = roi.filter2D(cv.CV_8U, mask)
    if (config.debug) debugImage('borderfilter-borders', borders)

    // blur
    // const blur = morpho.gaussianBlur(new cv.Size(5, 5), 1.5);
    // if (config.debug) cv.imshowWait('blur', blur);

    // close borderss
    let morpho = borders;
    morpho = morpho.morphologyEx(new cv.Mat(1,1, cv.CV_8U, 1), cv.MORPH_CLOSE, new cv.Point(-1, -1),
        1, cv.BORDER_CONSTANT)
    morpho = morpho.morphologyEx(new cv.Mat(1,1, cv.CV_8U, 1), cv.MORPH_OPEN, new cv.Point(-1, -1),
        1, cv.BORDER_CONSTANT)
    morpho = morpho.morphologyEx(new cv.Mat(2,2, cv.CV_8U, 1), cv.MORPH_GRADIENT, new cv.Point(-1, -1),
        1, cv.BORDER_CONSTANT)
    if (config.debug) debugImage('borderfilter-morpho', morpho);

    // otsu
    let otsu = morpho.threshold(0, 255, cv.THRESH_OTSU);
    if (config.debug) debugImage('borderfilter-otsu', otsu);

    // TODO
    return contours.findContours(otsu);
}

function tryCanny(roi) {
    let canny = roi.canny(100, 0, 3, true);
    if (config.debug) debugImage('canny-canny', canny);

    return contours.findContours(canny);
}

function debugImage(windowName, image) {
    cv.imshowWait(windowName, image);
    cv.destroyWindow(windowName)
}

module.exports = {
    processFrame
}