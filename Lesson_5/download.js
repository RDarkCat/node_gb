const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const cookieParser = require('cookie-parser');
const templating = require('consolidate');
const dbConnect = require('./db_connect');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

templating.requires.handlebars = handlebars;
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

handlebars.registerHelper('times', function (items, block) {
    let number = [];
    for (let i = 1; i < items + 1; i++)
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

    dbConnect.findAll()
        .then(items => {
            response.render('index', {items});
        })
        .catch(error => {
            response.render('index', {error});
        });
})

app.get('/create', function (request, response) {
    response.render('add');
});

app.post('/store', function (request, response) {
    dbConnect.store(request.body).then(result => {
            console.log(result);
            response.render("index", result);
        }
    ).catch(error => {
        response.render("index", error);
    });
});

app.get('/show/:id', function (request, response) {

})

app.post('/update/:id', function (request, response) {

});

app.listen(port, () => {
    console.log(`Server just started on port number ${port}`);
});

