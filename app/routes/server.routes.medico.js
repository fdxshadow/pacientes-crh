// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo

	var medico = require('../../app/controllers/server.controller.medico');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'pacientes'
	app.route('/api/medicos')
	  //  .get( paciente.list)
		 .get( medico.list)
	   .post( medico.create);

 app.route('/api/medicos/:medicoId')
 	 .get(medico.read);
	 app.param('medicoId', medico.medicoByID);

 // app.route('/api/medicos/:nombreEspecialidad')
 // 	.get(medico.listByEspecialidad);

	  // app.param('medicoId', medico.medicoByID);
		app.param('nombreEspecialidad', medico.paramEspecialidad);

 };
