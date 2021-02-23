const db = require('./models/db.js');
const initdb = require('./models/initdb.js');
initdb();

const express = require('express');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db);
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Большой секрет",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 }
});

var clients = [];

app.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on('connection', socket => {
  if (!socket.request.session || !socket.request.session.username) {
    console.log("Unauthorized user connected!");
    socket.disconnect();
  }

  console.log("Chat user connected:", socket.request.session.username);
  if (!clients.includes(socket.request.session.username)){
    clients.push(socket.request.session.username);
  }
  // код для добавления списка пользователей
  io.emit('userList', clients);

  socket.on('disconnect', () => {
    const client = clients.indexOf(socket.request.session.username);
    if (client > -1) {
      clients.splice(client, 1);
    }
    io.emit('userList', clients);

    console.log("Chat user connected:", socket.request.session.username);
  })
  // \ код для добавления списка пользователей

  socket.on('chatMessage', (data) => {
    console.log("Chat message from ", socket.request.session.username + ":", data);
    data.message = socket.request.session.username + " : " + data.message;
    io.emit('chatMessage', data);
  })
});

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

http.listen(3000, () => {
    console.log('Server listening on 3000 port.');
});
