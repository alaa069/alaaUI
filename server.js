'use strict';

const express = require("express");
const http = require('http');
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const url = require('url');
const request = require("request");
const mongoose = require('mongoose');
const UsersDB = require('./models/user');
const session = require('client-sessions');
const config = require(path.join(__dirname, "config", "config"));
const routes = require("./routes/index");
const API = require("./routes/api");

// Connect to DBs
mongoose.connect(config.urlDataBase)
    .then(() => console.log('Connection to DataBase success'))
    .catch((err) => console.error('Connection to DataBase failed'));
mongoose.set('debug', true);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces', 40);
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(session({
    cookieName: config.cookieName,
    secret: config.secret,
    duration: 3 * 60 * 60 * 1000,
    activeDuration: 60 * 60 * 1000,
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", routes);
app.use("/api", API);

app.use(function (req, res, next) {

    if (req.session && req.session.user) {
        UsersDB.findOne({ Mail: req.session.user.Mail }, '_id FirstName LastName FullName Username Mail Password', function (err, user) {
            if (user) {
                //req.user = user;
                //delete req.user.password; // delete the password from the session
                req.session.user = user;  //refresh the session value
                req.session.user.PasswordView = '';
                res.locals.user = req.session.user;
                res.locals.req = req;
                res.locals.res = res;
            } else {
                req.session.reset();
            }
            // finishing processing the middleware and run the route
            next();
        });
    } else {
        req.session.reset();
        next();
    }
});

var server = http.createServer(app);
server.listen(config.serverPort, function () {
    console.log('HTTP server listening on port ', config.serverPort);
});