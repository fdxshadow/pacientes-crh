// Invocar al modo JavaScript 'strict'
'use strict';

// cargar controller 'users'
var reserva = require('../../app/controllers/server.controller.reservas');
//console.info('hola');
module.exports = function (app) {
	
	app.route('/reservas/:fecha').get(reserva.mostrar);
	app.route('/horario1').get(reserva.getHorario);
	app.route('/reservas').post(reserva.crear);
	
}

