var flash = require('connect-flash'),
    morgan = require('morgan'),
    session = require('express-session'),
    express = require('express'),
    compress = require('compression'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    router = express.Router();

module.exports = function(app, config){

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'ejs');

    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath + './public'));
};

/*
    stylus, cookiParser, Jade
    module.exports = function(app, config){
    function compile(str, path){
        return stylus(str).set('filename', path);
    }
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
 */