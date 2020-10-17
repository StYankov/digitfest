const axios = require('axios').default;
const cheerio = require('cheerio');

async function getData() {
    const dishes1 = await axios.get('https://www.tasteatlas.com/50-most-popular-foods-in-bulgaria');
    const dishes2 = await axios.get('https://www.tasteatlas.com/most-popular-food-in-bulgaria');


    return parseData(dishes2).reverse().concat(parseData(dishes1).reverse());
}

function parseData(html) {
    const $ = cheerio.load(html);
    const recepies = $('.top-list-article__item');

    const results = [];
    recepies.each(function(i, el) {
        const names = $(this).find('.top-list-article__item-title .middle a'); 
        results.push({
            name: names.eq(1).text(),
            url: $(this).find('.more-info a').first().attr('href'),
            image: $(this).find('.top-list-article__item-image img').first().attr('src'),
            type: 'recipe',
            body: {
                type: names.eq(0).text(),
                description: $(this).find('.description').attr('read-more-txt').replace(/(<([^>]+)>)/gi, "")
            }
        });
    });

    return results;
}

module.exports = getData;