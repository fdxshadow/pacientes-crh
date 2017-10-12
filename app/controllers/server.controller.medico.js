// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Medico = mongoose.model('Medico');

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
// Crear un nuevo método controller para crear nuevos medicos
exports.create = function(req, res) {
	// Crear un nuevo objeto medico
	var medico = new Medico(req.body);

	// Intentar salvar el medico
	medico.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del medico
			res.json(medico);
		}
	});
};

exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de medicos
	Medico.find({}, function(err, medicos){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(medicos);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.medico);
};

exports.medicoByID = function(req, res, next, id){
	Medico.findOne({
		_id: id
	}, function(err, medico){
		if (err) return next(err);
		if (!medico) return next(new Error('Fallo al cargar el medico ' + id));
		// Si un medico es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		console.log("hola");
		req.medico = medico;
		// Llamar al siguiente middleware
		next();
	});
};

exports.paramEspecialidad = function(req, res, next, _especialidad){
	req.especialidad = _especialidad;
	next();
};

exports.listByEspecialidad = function(req, res) {
	// Usar el método model 'find' para obtener una lista de ingresos
	Medico.find({
		especialidad: req.especialidad
	}).exec(function(err, medicos) {
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(medicos);
		}
	});
};
