 var session = require('express-session'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	config = require('./config'),
	methodOverride = require('method-override'),
	flash = require('connect-flash'),
	passport = require('passport');

module.exports = function(){
	var app = express();

	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else if(process.env.NODE_ENV === 'production'){
		app.use(compress());
	}
	app.use(bodyParser.urlencoded({ // arregla error con req.body vacio en peticiones post
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));
	// configurar motor de las views
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());


	// configurar archivos de enrutamiento
	require('../app/routes/server.routes.index.js')(app);
  require('../app/routes/server.routes.paciente.js')(app);
	require('../app/routes/server.routes.users.js')(app);
	require('../app/routes/server.routes.reservas.js')(app);

	// configurar el servidor de archivos estáticos
	app.use(express.static('./public'));
	return app;
}
