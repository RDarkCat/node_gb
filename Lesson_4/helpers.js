const axios = require('axios');
const cheerio = require("cheerio");

function parseNews(data, number) {
    let newsList = []

    let $ = cheerio.load(data);
    $('#main').find('header').each((i, element) => {
        if (i < number) {
            newsList.push($(element).text())
        }
    });

    return newsList
}

async function getNews(url) {
    if (url === undefined) {
        return false;
    }

    try {
        return await axios.get(url)
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    parseNews,
    getNews
}
