const axios = require('axios').default;
const cheerio = require('cheerio');

async function getData(query) {
    const resposne = await axios.get(`https://www.allrecipes.com/search/?wt=${query}`);
    const recipes = parseData(resposne.data);

    return recipes;
}

module.exports = getData;

function parseData(html) {
    const $ = cheerio.load(html);
    const recipes = $('.fixed-recipe-card:not(.grid-ad)');

    const results = [];

    recipes.each(function(i, el) {
        results.push({
            name: $(this).find('.fixed-recipe-card__title-link').first().text(),
            url: $(this).find('.fixed-recipe-card__title-link').first().attr('href'),
            image: $(this).find('.fixed-recipe-card__img').first().attr('src'),
            type: 'recipe',
            body: $(this).find('.fixed-recipe-card__description').first().text()
        });
    });

    return results;
}