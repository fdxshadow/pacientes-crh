// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo

	var paciente = require('../../app/controllers/server.controller.paciente');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'pacientes'
	app.route('/api/pacientes')
	  //  .get( paciente.list)
	   .post( paciente.create);

 };