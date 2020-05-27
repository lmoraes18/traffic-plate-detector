let stage = {};

function setContent(content) {
    stage = content;
    // persist to file
}

function getContent() {
    // read from file
    return stage;
}

function clear() {
    stage = null;
}

module.exports = {
    setContent,
    getContent,
    clear
};