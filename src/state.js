let stage = {};

function setContent(content) {
    stage = content;
    // persist to file
}

function getContent() {
    // read from file
    return stage;
}

module.exports = {
    setContent,
    getContent
};