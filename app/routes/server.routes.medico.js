'use strict'

var medico = require('../../app/controllers/server.controller.medico');

module.exports = function (app) {
	app.route('/medicos').get(medico.getMedicos);

	app.route('/api/medicos')
		//  .get( paciente.list)
		 .get(medico.list);
	app.route('/api/medicos').post( medico.create);

	app.route('/api/medicos/:medicoId')
	.put(medico.update)
	.get(medico.read);

	app.param('medicoId', medico.medicoByID);
}
