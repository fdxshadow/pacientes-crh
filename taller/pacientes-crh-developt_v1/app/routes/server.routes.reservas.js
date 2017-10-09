// Invocar al modo JavaScript 'strict'
'use strict';

// cargar controller 'users'
var reserva = require('../../app/controllers/server.controller.reservas'),
	passport = require('passport');
//console.info('hola');
module.exports = function (app) {
	
	app.route('/reservas').get(reserva.mostrar);
	app.route('/reservas').post(reserva.crear);
	
}

