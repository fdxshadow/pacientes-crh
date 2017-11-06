var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	// Conectar a mongo db

	var db = mongoose.connect(config.DBuri);
	// Cargar modelos de base de datos
	require('../app/models/server.model.user');
	var pacienteModel = require('../app/models/server.model.paciente');
    pacienteModel.createDefaultPacientes();
    var examenModel = require('../app/models/server.model.examenes');
    examenModel.createDefaultExamenes();

    //retornar instancia de mongoose
	require('../app/models/server.model.reserva');
	require('../app/models/server.model.horas');
	require('../app/models/server.model.medicos');
	require('../app/models/server.model.examenes');
	//retornar instancia de mongoose
	return db;
}
