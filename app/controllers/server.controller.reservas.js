// Invocar al modo JavaScript 'strict'
'use strict';

// cargar modelo 'User' desde mongoDB
var reserva = require('mongoose').model('Reserva');
	
exports.mostrar = function(req, res){
	var fecha=req.params.fecha;
	reserva.find({fecha_reserva:fecha}).exec(function(error,reservas){
		if(error){
			return res.send(error);
		}
		return res.json(reservas);				
	});
};
exports.crear = function(req, res, next){
	//ojo probar sacando lo de abajo
	var reserva = require('mongoose').model('Reserva');
	
	var reservas = new reserva(req.body);

	//console.log(req.body);
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


exports.getHorario = function (req,res) {
	reserva.find({}).populate({path:'Paciente', select:'firstName'}).populate({path:'Medico',select:'nombre'}).
	exec(function(err,hora){
		if(err) res.send('error');
		console.log(hora);
		res.json(hora);
	});
};	


