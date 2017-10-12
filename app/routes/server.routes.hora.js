// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo

	var Hora = require('../../app/controllers/server.controller.Hora');
	// var medico = require('../../app/controllers/server.controller.medico');
// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'pacientes'
	// app.route('/api/horas')
	//   //  .get( paciente.list)
	//    .post( Hora.create)
	// 	 .get( Hora.list);

	app.route('/api/horas/:buscarFecha/:nombreMedico')
		 .get(Hora.listByFecha_Medico);


app.param('buscarFecha', Hora.paramFecha);
app.param('nombreMedico', Hora.paramMedico);

 };
