const cv = require('opencv4nodejs');
const config = require('./src/config');
const io = require('./src/io');
const plateDetection = require('./src/plateDetection');

const MODE          = config["input-mode"];
const INPUT         = config.input;
const OUTPUT        = config.output;

function main() {
    switch (MODE) {
        case 'image':
            execImageMode()
            break;
        case 'video':
            execVideoMode()
            break;
        case 'camera':
            execCameraMode()
            break;
    }
}

function execImageMode() {
    const originalImage = io.readImage(INPUT);

    let rects = plateDetection.processFrame(originalImage);

    // TODO
    let result = originalImage;

    if (OUTPUT) {
        io.writeImage(OUTPUT, result);
    } else {
        cv.imshowWait(INPUT, result);
    }
}

function execVideoMode() {
    console.error("video mode not implemented")
}

function execCameraMode() {
    console.error("camera mode not implemented")
}

main()