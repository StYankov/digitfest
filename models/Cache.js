const mongoose = require('./mongoose');

const CacheSchema = new mongoose.Schema({
    name: String,
    data: Array,
    date: Date
});

const Cache = mongoose.model('Cache', CacheSchema);

module.exports = Cache;