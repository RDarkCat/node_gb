const db = require('./models/db.js');
const initdb = require('./models/initdb.js');
initdb();

const passport = require('passport');
const express = require('express');

const app = express();

app.use(express.static(__dirname+'/public'));

const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db);
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Большой секрет",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 110000000 }
});

app.use(sessionMiddleware);

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

app.use(express.json());
app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

const registerHelpers = require('./views/helpers');
registerHelpers();

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const router = require('./routers');

app.use(router);

const VKontakteStrategy = require('passport-vkontakte').Strategy;

const User = require("./models/user");

passport.use(new VKontakteStrategy(
    {
      clientID:     "",
      clientSecret: "",
      callbackURL:  "http://localhost:3000/auth/vkontakte/callback"
    },
    function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
        console.log(profile);
       //return done(null, profile);
        // здесь проблема с сериализацией, но данные пользователя получает хорошо
        User.createVkUser(profile)
            .then((user) => {
                console.log(user); done(null, user); })
            .catch(done);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(function (user) { done(null, user); })
        .catch(done);
});

app.listen(3000, () => {
    console.log('Server listening on 3000 port.');
});
