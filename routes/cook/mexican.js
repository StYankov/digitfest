const axios = require('axios').default;
const cheerio = require('cheerio');

async function getData(html) {
    const response = await axios.get('https://www.tasteofhome.com/collection/mexican-foods-take/');
    const data = parseData(response.data);

    return data;
}

module.exports = getData;

function parseData(html) {
    const $ = cheerio.load(html);
    const recipes = $('.listicle-card');

    const results = [];

    recipes.each(function(i, el) {
        results.push({
            name: $(this).find('.listicle-page__title').first().text(),
            url: $(this).find('.listicle-page__title a').first().attr('href'),
            image: $(this).find('img').first().attr('data-lazy-src'),
            type: 'recipe',
            body: $(this).find('.card-content').text()
        });
    });

    return results;
}