const axios = require('axios').default;
const cheerio = require('cheerio');

module.exports = async function getBooks(query) {
    const amazonResponse = await axios.get(`https://www.amazon.com/s?k=${encodeURI(query)}&i=stripbooks-intl-ship&ref=nb_sb_noss`);
    const booksAMillion = await axios.get(`https://www.booksamillion.com/search?filter=&id=8029253721490&query=${encodeURI(query)}`);

    return [...parseAmazon(amazonResponse.data)].concat(parseBooksAMillion(booksAMillion.data));
}

function parseAmazon(html) {
    const $ = cheerio.load(html);
    const books = $('[data-asin].s-asin');

    const response = [];
    books.each(function(i, el) {
        const name = $(this).find('.a-link-normal span').first().text();
        const image= $(this).find('.s-image').first().attr('src');
        const url = 'https://www.amazon.com' +  $(this).find('.a-link-normal').first().attr('href');
        const author = $(this).find('.a-section .a-row').first().text();

        response.push({
            name,
            image,
            url,
            author,
            type: 'custom'
        });
    });

    return response;
}

function parseBooksAMillion(html) {
    const $ = cheerio.load(html);
    const books = $('.search-result-item');
    const response = [];

    books.each(function(i, el) {
        const name = $(this).find('.search-item-title').first().text();
        const url = $(this).find('.search-item-title a').first().attr('href');
        const image = $(this).find('.imageContainer img').first().attr('src');
        const author = $(this).find('.search-item-author').first().text();

        response.push({
            name,
            url,
            image,
            author,
            type: 'custom'
        });
    });
}