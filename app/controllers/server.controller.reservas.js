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
		reserva.find({estado_reserva:{'$ne':'rechazado'}}).populate('paciente_id','firstName telephone').populate('medico_id','nombre').
	exec(function(err,hora){
		if(err) res.send('error');
		console.log(hora);
		res.json(hora);
	});
};

//########################################

exports.listByFecha_Medico = function(req, res) {
	// Usar el método model 'find' para obtener una lista de facturas
	reserva.find({
		fecha_reserva: req.fecha,
		 medico_id: req.id_medico
		  // hora_inicio_reserva: req.id_medico
	 }).populate('paciente_id','firstName').exec(function(err, horas){
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

// buscar por mes para reporte
exports.listByFecha = function(req, res) {
	// Usar el método model 'find' para obtener una lista de facturas
	reserva.find({
		// fecha_reserva: req.fecha
		fecha_reserva: {'$regex': req.fecha}
		//  medico_id: req.id_medico
		  // hora_inicio_reserva: req.id_medico
	 }).populate('paciente_id','firstName').exec(function(err, horas){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			console.log("encontro esto:")
			console.log(horas);
			var reservaCount = 0;
			var consultaCount = 0;
			var examenCount = 0;
			var noConfirm = 0;
			var confirm = 0;

			// enum:['consulta médica', 'examen']
			// var confCount = 0;
			// var
			horas.forEach(function(hora){

				if(hora.estado_reserva == "confirmado"){
					switch(hora.tipo_reserva) {
								case "consulta médica":
										consultaCount += 1;
										break;
								case "examen":
										examenCount +=1;
										break;
								default:
										//
						};
					confirm += 1;

				}else {
					noConfirm += 1;
				};

				reservaCount += 1;
				    // console.log(hora.estado_reserva);
				    // Do whatever processing you want
				});
				console.log('consultas: ' + consultaCount);
				console.log('examens : ' + examenCount);

				// console.log(hora.estado_reserva);
				var counts = {
				    reservas: reservaCount,
				    consultas: consultaCount,
						examenes : examenCount,
						perdidas: noConfirm,
						confirmadas : confirm
				};
				var result = [];
				result.push(counts);
				// var horas = JSON.stringify({datos});
				horas = result;

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
