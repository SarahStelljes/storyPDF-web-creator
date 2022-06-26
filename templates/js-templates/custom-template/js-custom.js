module.exports = () => {
    return `
    // these are gonna be required for what you need to do in this file.
    // Also, don't forget to use browserify! You'll need this in order for the website to work.
    // an example use would be 'npm browserify story-outline.js -o bundleStoryOutline.js'
    const blobStream = require('blob-stream');
    const pdf = require('pdfkit');
    `
}