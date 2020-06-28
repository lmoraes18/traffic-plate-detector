const cv = require('opencv4nodejs');
const config = require('./config');
const misc = require('./misc');
const contours = require('./contours');

function processFrame(frame) {
    let roi = misc.roi(frame);
    roi = roi.cvtColor(cv.COLOR_RGBA2GRAY)

    let contours = tryOtsu(roi);
    if (contours.length == 0) {
        contours = tryThresholdAdaptative(roi);
        if (contours.length == 0) {
            contours = tryThresholdHighFilter(roi);
        }
    }
    
    return contours;
}

function tryOtsu(roi) {
    let otsu = roi.threshold(0, 255, cv.THRESH_OTSU);
    if (config.debug) debugImage('otsu', otsu);

    const blur = otsu.gaussianBlur(new cv.Size(5, 5), 1.2);
    if (config.debug) debugImage('blur', blur);

    const morpho = blur.morphologyEx(new cv.Mat(5, 5, cv.CV_8U, 1), cv.MORPH_CLOSE, new cv.Point(-1, -1),
            1, cv.BORDER_CONSTANT)
    if (config.debug) debugImage('morpho', morpho);

    return contours.findContours(morpho);
}

function tryThresholdAdaptative(roi) {
    return []

    let adapt = roi.adaptiveThreshold(255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY_INV, 9, 5);
    if (config.debug) debugImage('adapt', adapt)

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
    if (config.debug) debugImage('borders', borders)

    // blur
    const blur = borders.gaussianBlur(new cv.Size(5, 5), 2);
    if (config.debug) cv.imshowWait('blur', blur);

    // let denoise = blur.cvtColor(cv.COLOR_GRAY2RGB)
    // denoise = cv.fastNlMeansDenoisingColored(denoise)
    // denoise = denoise.cvtColor(cv.COLOR_RGB2GRAY)
    // if (config.debug) debugImage('denoise', denoise);

    // otsu
    let otsu = blur.threshold(0, 255, cv.THRESH_OTSU);
    if (config.debug) debugImage('otsu', otsu);

    // close borderss
    let morpho = otsu;
    morpho = morpho. morphologyEx(new cv.Mat([[0,1,0],[1,1,1],[0,1,0]], cv.CV_8U, 1), cv.MORPH_GRADIENT, new cv.Point(-1, -1),
        1, cv.BORDER_CONSTANT)
    morpho = morpho.morphologyEx(new cv.Mat([[1, 1]], cv.CV_8U, 1), cv.MORPH_CLOSE, new cv.Point(-1, -1),
        1, cv.BORDER_CONSTANT)
    morpho = morpho.morphologyEx(new cv.Mat([[1], [1]], cv.CV_8U, 1), cv.MORPH_CLOSE, new cv.Point(-1, -1),
        1, cv.BORDER_CONSTANT)
    if (config.debug) debugImage('morpho', morpho);

    // TODO
    return contours.findContours(morpho);
}

function debugImage(windowName, image) {
    cv.imshowWait(windowName, image);
    cv.destroyWindow(windowName)
}

module.exports = {
    processFrame
}