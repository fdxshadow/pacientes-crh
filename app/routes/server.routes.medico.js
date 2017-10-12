'use strict'

var medico = require('../../app/controllers/server.controller.medico');

module.exports = function (app) {
	app.route('/medicos').get(medico.getMedicos);
	
}