const cheerio = require("cheerio");
const util = require("util");

const request = require("request")
request('https://phoronix.com', function(error, response, data){
    if(!error && response.statusCode === 200) {
        let $ = cheerio.load(data);
        $('#main').find('header').each(function(i, element){
            console.log($(this).text());
        });
    } else {
        console.log(error, response.statusCode);
    }
});
