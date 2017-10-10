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
	var reserva = require('mongoose').model('Reserva');
	
	var reservas = new reserva(req.body);

	console.log(req.body);
	//console.info(req.body);
	// usar metodo save para guardar el nuevo usuario
	reservas.save(function(err){
		if (err) {
			console.log(err)
			// Si ocurre algún error enviar el mensaje de error
			return res.next(err);
		} else {
			console.log(reservas)
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(reservas);
		}
	});
};

