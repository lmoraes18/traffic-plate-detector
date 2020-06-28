const cv = require('opencv4nodejs');
const config = require('./src/config');
const io = require('./src/io');
const contours = require('./src/contours');
const plateDetection = require('./src/plateDetection');
const misc = require('./src/misc');

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
    const image = io.readImage(INPUT);
    const offset = misc.getRoiOffset(image);

    let rects = plateDetection.processFrame(image);
    rects.forEach(a => {
        let rect = a.rect;
        let offsetRect = new cv.Rect(rect.x + offset.x, rect.y + offset.y, rect.width, rect.height);

        contours.drawRects(image, offsetRect);
    })
    contours.drawRects(image, offset);

    if (rects.length == 0) {
        console.log("Não foi possível encontrar nenhum candidado a placa de transito nesta imagem");
    } else {
        if (OUTPUT) {
            io.writeImage(OUTPUT, image);
        } else {
            cv.imshowWait(INPUT, image);
        }
    }

}

function execVideoMode() {
    console.error("video mode not implemented")
}

function execCameraMode() {
    console.error("camera mode not implemented")
}

main()