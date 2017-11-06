// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var examen = require('../../app/controllers/server.controller.examen');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'pacientes'
	app.post('/create/examen', examen.create);
	app.get('/examenes', examen.getExamenes);
};