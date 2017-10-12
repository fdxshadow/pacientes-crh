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
	reserva.find({estado:'confirmado',estado:'registrado'}).populate('Paciente').populate('Medico').
	exec(function(err,hora){
		if(err) res.send('error');
		console.log(hora);
		var prueba = [{
				"paciente_id": "akshbdasdasa",
				"medico_id": "ajkdhb83272sjkd",
				"hora_inicio_reserva": "08:30:00",
				"hora_fin_reserva": "09:30:00",
				"fecha": "2017-10-24",
				"estado": "confirmado"
			}, {
				"paciente_id": "akshbdasdg879",
				"medico_id": "ajkdhb83272sjkd",
				"hora_inicio_reserva": "08:30:00",
				"hora_fin_reserva": "09:30:00",
				"fecha": "2017-10-23",
				"estado": "registrado"
			}]
		res.json(prueba);
	});
};	


