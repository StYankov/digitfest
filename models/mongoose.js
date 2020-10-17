const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stoil:8V3daA4rsBZvPpQb@cluster0.ijjcf.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;