'use strict'

var calendario = require('../../app/controllers/server.controller.calendario');

module.exports = function (app) {
	app.route('/horarios').get(calendario.getHorario);
	
}