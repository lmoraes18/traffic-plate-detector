let stage = {};
let imageStack = [];

function setContent(content) {
    stage = content;
    // persist to file
}

function getContent() {
    // read from file
    return stage;
}

function pushImage() {
    imageStack.push(stage.image.clone());
}

function popImage() {
    stage.image.delete();
    stage.image = imageStack.pop();
}

function clear() {
    stage = null;
    imageStack = [];
}

module.exports = {
    setContent,
    getContent,
    pushImage,
    popImage,
    clear
};