'use strict'

var Medico = require('mongoose').model('Medico');




exports.getMedicos = function (req, res) {
    Medico.find({}).exec(function (err, collection) {
        res.send(collection);
    })
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
