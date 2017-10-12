var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	// Conectar a mongo db

	var db = mongoose.connect(config.DBuri);
	// Cargar modelos de base de datos
	require('../app/models/server.model.user');
	var pacienteModel = require('../app/models/server.model.paciente');
    pacienteModel.createDefaultPacientes();

    //retornar instancia de mongoose
	require('../app/models/server.model.reserva');
	return db;
}
