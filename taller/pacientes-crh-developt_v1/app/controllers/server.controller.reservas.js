// Invocar al modo JavaScript 'strict'
'use strict';

// cargar modelo 'User' desde mongoDB
var reserva = require('mongoose').model('Reserva');
	
exports.mostrar = function(req, res, next){
	reserva.find().exec(function(error,reservas){
		if(error){
			return res.next(error);
			//console.info('error');
		}
		//console.info(reservas[0]);
		res.json(reservas);
		//res.json(reservas);
		
		
	});
};
exports.crear = function(req, res, next){
	//ojo probar sacando lo de abajo
	var Reserva = require('mongoose').model('Reserva');

	var reserva = new Reserva(req.body);
	console.info(req.body);
	// usar metodo save para guardar el nuevo usuario
	reserva.save(function(err){
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.next(err);
		} else {
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(reserva);
		}
	});
};

