var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function(){
	// Conectar a mongo db

	var db = mongoose.connect(config.DBuri);
	// Cargar modelos de base de datos
	require('../app/models/server.model.user');
	require('../app/models/server.model.paciente');
	require('../app/models/server.model.medico');
	require('../app/models/server.model.hora');
	//retornar instancia de mongoose
	return db;
}
