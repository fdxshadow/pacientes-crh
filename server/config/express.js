var session = require('express-session'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    passport = require('passport')
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




    // configurar el servidor de archivos estáticos
    app.use(express.static(config.rootPath + './public'));
}


/*

var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport');


module.exports = function(app, config){
    function compile(str, path){
        return stylus(str).set('filename', path);
    }

    app.set('view engine', 'jade');
    app.use(cookieParser());


    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
}



 */