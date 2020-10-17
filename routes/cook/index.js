const bulgarian = require('./bulgarian');
const custom = require('./custom');
const italian = require('./italian');
const mexican = require('./mexican');
const chinese = require('./chinese');

function getBooks(serach) {
    switch(serach) {
        case 'bulgarian': 
            return bulgarian;
        case 'mexican':
            return mexican;
        case 'italian':
            return italian;
        case 'chinese':
            return chinese;
        default:
            return custom;
    }
}

module.exports = getBooks;