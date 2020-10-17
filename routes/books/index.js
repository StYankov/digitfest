const crime = require('./crime');
const fantasy = require('./fantasy');
const romance = require('./romance');
const horror = require('./horror');
const custom = require('./custom');

function getBooks(serach) {
    switch(serach) {
        case 'crime': 
            return crime;
        case 'fantasy':
            return fantasy;
        case 'romance':
            return romance;
        case 'horror':
            return horror;
        default:
            return custom;
    }
}

module.exports = getBooks;