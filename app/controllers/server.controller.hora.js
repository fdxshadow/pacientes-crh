// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Hora = mongoose.model('Hora');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido';
	}
};

// Crear un nuevo método controller que recupera una lista de facturas
exports.listByFecha_Medico = function(req, res) {
	// Usar el método model 'find' para obtener una lista de facturas
	Hora.find({
		fecha: req.fecha,
		 id_medico: req.id_medico
	 }).populate('id_paciente','nombre').exec(function(err, horas){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			console.log("encontro esto:")
			console.log(horas);
			res.json(horas);
		}
	});
};

exports.paramFecha = function(req, res, next, _fecha){
	req.fecha = _fecha;
	next();
};
exports.paramMedico = function(req, res, next, _id_medico){
	req.id_medico = _id_medico;
	next();
};
