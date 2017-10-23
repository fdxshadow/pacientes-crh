// Invocar al modo JavaScript 'strict'
'use strict';

// cargar controller 'users'
var reserva = require('../../app/controllers/server.controller.reservas');
//console.info('hola');
module.exports = function (app) {

	app.route('/reservas/:fecha').get(reserva.mostrar);
	app.route('/horario1').get(reserva.getHorario);
	app.route('/horario1').post(reserva.edit);
	app.route('/reservas').post(reserva.crear);

	app.route('/api/horas/:buscarFecha/:nombreMedico')
		 .get(reserva.listByFecha_Medico);
		 app.param('buscarFecha', reserva.paramFecha);
		 app.param('nombreMedico', reserva.paramMedico);

}
