var Paciente = require('mongoose').model('Paciente');

exports.getPacientes = function (req, res) {
    Paciente.find({}).exec(function (err, collection) {
        res.send(collection);
    })
}

var ObjectId = require('mongoose').Types.ObjectId;


exports.getPacientesById = function (req, res) {
    Paciente.findOne({"_id":ObjectId(req.params.id)}).exec(function (err, paciente) {
        res.send(paciente)
    })
    //Paciente.findOne({_id:req.params.id}).exec(function (err, paciente) {
};


exports.create = function (req, res, next) {
    var pacienteData = req.body;
    console.log(req.body.rut);

    Paciente.find({"rut": req.body.rut}).exec(function(err, collection) {
        if(collection.length > 0) {
            err = new Error('RUT ya existe');
            res.status(400);
            return res.send({reason:err.toString()})
        }
        else {
            Paciente.create(pacienteData, function(err, paciente){
                if(err){
                    if(err.toString().indexOf('E11000') > -1){
                        err = new Error('Paciente ya existe');
                    }
                    res.status(400);
                    return res.send({reason:err.toString()})
                }
                res.send(paciente);
            })
		}
    })



};









/*
// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Paciente = mongoose.model('Paciente');

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
// Crear un nuevo método controller para crear nuevos pacientes
exports.create = function(req, res) {
	// Crear un nuevo objeto paciente
	var paciente = new Paciente(req.body);

	// Intentar salvar el paciente
	paciente.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del paciente
			res.json(paciente);
		}
	});
};*/
