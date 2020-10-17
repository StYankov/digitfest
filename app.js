var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var getBooks = require('./routes/books/index');
var getRecipes = require('./routes/cook/index');
var getKnitting = require('./routes/knitting/index');

var Cache = require('./models/Cache');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/query', async function(req, res) {
    const type = req.body.type;
    let data = [];

    const cached = await Cache.findOne({ name: `${type}.${req.body.query}` });

    if(cached && cached.date > (Date.now() + (60 * 60 * 24 * 1000))) {
        data = cached.data;
    } else {
        await Cache.deleteOne({ name: `${type}.${req.body.query}` });

        switch(type) {
            case 'book':
                data = await getBooks(req.body.query)();
                break;
            case 'recipe':
                data = await getRecipes(req.body.query)();
                break;
            case 'knitting':
                data = await getKnitting();
                break;
        }

        await Cache.create({
            name: `${type}.${req.body.query}`,
            date: Date.now() + (60*60*24*1000),
            data
        });
    }

    return res.json(data);
});

module.exports = app;
