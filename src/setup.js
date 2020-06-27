const { Canvas, createCanvas, Image, ImageData, loadImage  } = require('canvas');
const { JSDOM } = require('jsdom');
const state = require('./state.js');

async function setup() {

    console.log("initializing jsdom");
    installDOM();
    console.log("jsdom initialized");

    console.log("initializing opencv");
    await loadOpenCV();
    console.log("opencv initialized");

    // Using jsdom and node-canvas we define some global variables to emulate HTML DOM.
    // Although a complete emulation can be archived, here we only define those globals used
    // by cv.imread() and cv.imshow().
    function installDOM() {
        global.dom = new JSDOM();
        global.document = dom.window.document;
        // The rest enables DOM image and canvas and is provided by node-canvas
        global.Image = Image;
        global.HTMLCanvasElement = Canvas;
        global.ImageData = ImageData;
        global.HTMLImageElement = Image;
        global.HTMLVideoElement = Image;
    }
    
    // Load opencv.js using Promise instead of callbacks:
    function loadOpenCV() {
        return new Promise(resolve => {
            global.Module = {
                onRuntimeInitialized: resolve
            };
            global.cv = require('../libs/opencv.js');
        });
    }
}

module.exports = setup;