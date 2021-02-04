const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const cookieParser = require('cookie-parser');
const templating = require('consolidate');
const helpers = require('./helpers');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

templating.requires.handlebars = handlebars;
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

handlebars.registerHelper('times', function(items, block) {
    let number = [];
    for(let i = 1; i < items+1; i++)
        number.push(block.fn(i));
    return number;
});

let port = process.env.PORT || 3000;
//let newsSite = process.env.news;
app.get('/', function (request, response) {
    let siteNameCookie = request.cookies.siteName
    let options = {}

    if (siteNameCookie !== undefined) {
       options.siteName = siteNameCookie;
    }

    response.render('index', options);

})

app.post('/news', function (request, response) {
    let siteNameCookie = request.cookies.siteName
    if (siteNameCookie === undefined) {
        response.cookie('siteName', request.body.siteName, {maxAge: 300000, httpOnly: true});
    }
    helpers.getNews(request.body.siteName)
        .then(result => {
            response.render('news', {
                'news': helpers.parseNews(result.data, request.body.newsNumber),
                'siteName': siteNameCookie
            });
        })
        .catch(error => {
            response.render('news', error);
        });
});

app.listen(port, () => {
    console.log(`Server just started on port number ${port}`);
});

