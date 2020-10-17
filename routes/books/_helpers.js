const cheerio = require('cheerio');

function parseManyBooksData(html) {
    const $ = cheerio.load(html);
    const books = $('.book');

    const result = [];
    books.each(function(i, el) {
        const name = $(this).find('.field--name-field-title').first().text();
        const url = 'https://manybooks.net/' + $(this).find('.field--name-field-title a').first().attr('href');
        const image = $(this).find('img').first().attr('src');

        result.push({
            name,
            author: '',
            url,
            image,
            type: 'crime'
        })
    });

    return result;
}

function parseGoodReadsData(html) {
    const $ = cheerio.load(html);
    const books = $('#all_votes tr');
    const result = [];

    books.each(function(i, el) {
        const name = $(this).find('.bookTitle').first().text();
        const url = 'https://www.goodreads.com/' + $(this).find('.bookTitle').first().attr('href');
        const image = $(this).find('.bookCover').first().attr('src');
        const author = $(this).find('.authorName').first().text();

        result.push({
            name,
            url,
            image,
            author
        });
    });

    return result;
}

module.exports = {
    parseManyBooksData,
    parseGoodReadsData
}