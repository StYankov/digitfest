const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
    name: String,
    author: String,
    url: String,
    type: String,
    image: String
});

module.exports = DataSchema;