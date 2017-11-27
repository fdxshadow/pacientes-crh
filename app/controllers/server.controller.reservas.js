// Invocar al modo JavaScript 'strict'
'use strict';

// cargar modelo 'User' desde mongoDB
var reserva = require('mongoose').model('Reserva');
var examen = require('mongoose').model('Examen');
exports.mostrar = function(req,res){
	console.log(req.params);
	var fecha = req.params.fecha;
	if(req.params.medico && req.params.examen && req.params.medico != "no"){
		reserva.find({fecha_reserva:fecha,medico_id:req.params.medico,"tipo_reserva.descripcion":req.params.examen,estado_reserva:{'$ne':'rechazado'}}).exec(
			function(error,reservas){
				if (error) return res.send(error);
				console.log("ecografia")
				return res.json(reservas);
			});
	}else
		if (req.params.medico && req.params.medico != "no") {
			reserva.find({fecha_reserva:fecha,medico_id:req.params.medico,estado_reserva:{'$ne':'rechazado'}}).exec(function(error,reservas){
				if (error) return res.send(error);
				console.log("consulta medica");
				return res.json(reservas);
			})
		}
		else
			if (req.params.examen) {
				reserva.find({fecha_reserva:fecha,"tipo_reserva.descripcion":req.params.examen,estado_reserva:{'$ne':'rechazado'}}).exec(
					function(error,reservas){
						if(error) return res.send(error);
						console.log("examen");
						return res.json(reservas);
					});
			}
}


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
		}
			console.log(reservas)
			// usar objeto response (res) para enviar una respuesta JSON
			return res.json(reservas);

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

exports.edit = function(req,res){
	var id=req.body.evento._id;
	var accion = req.body.evento.accion;
	reserva.findById(id,function(err,evento){
		if (err) return res.send(err);
		evento.estado_reserva = accion;
		evento.save(function(err,updateevento){
			if (err) res.send(err);
			console.log(updateevento);
			return res.send(true);
		});
	});
}

//########################################

exports.listByFecha_Medico = function(req, res) {
	// Usar el método model 'find' para obtener una lista de facturas
	reserva.find({
		fecha_reserva: req.fecha,
		 medico_id: req.id_medico,
		 estado_reserva : 'confirmado'
		  // hora_inicio_reserva: req.id_medico
	 }).populate('paciente_id','firstName lastName').populate('tipo_reserva.descripcion','nombre').exec(function(err, horas){
		if(err){
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			// usar objeto response (res) para enviar una respuesta JSON
			console.log("encontro esto:")
			console.log(horas);

				//creaemo un arreglo vacio
			var result = [];
			horas.forEach(function(hora){
				// if (hora.estado_reserva == 'confirmado') {
        //
        //
				// }

				var firstName = hora.paciente_id.firstName + ' ' + hora.paciente_id.lastName;
				var hora_inicio_reserva = hora.hora_inicio_reserva;
				var hora_fin_reserva = hora.hora_fin_reserva;

				if(hora.tipo_reserva.tipo == 'consulta médica'){
						var tipo_reserva = hora.tipo_reserva.tipo;
				}else {
					var tipo_reserva = hora.tipo_reserva.tipo + ' : ' + hora.tipo_reserva.descripcion.nombre;
				}
				// var tipo_reserva = hora.tipo_reserva.tipo;
				var estado_reserva = hora.estado_reserva;

				//creamo un objeto json
				var objeto = {
					firstName: firstName,
					hora_fin_reserva: hora_fin_reserva,
					hora_inicio_reserva: hora_inicio_reserva,
					tipo_reserva: tipo_reserva,
					estado_reserva: estado_reserva
				};

				result.push(objeto);

				// horas= result;

				});
			//#################
			horas= result;
			console.log('################');
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
	 }).populate('paciente_id','firstName lastName rut').populate('tipo_reserva.descripcion','nombre').exec(function(err, horas){
					if(err){
						// Si un error ocurre enviar un mensaje de error
						return res.status(400).send({
					  message: getErrorMessage(err)
						});
					}else{
						examen.distinct('nombre').exec(function(err, dist){

						var reservaCount = 0;
						var noConfirm = 0;
						var confirm = 0;
						var consultaCount = 0;
						var examenCount = 0;
						var examenConfSum = 0;
						var examDimCount = new Array(dist.length);
						// var examDistCount = 0;
						examDimCount.fill(0);

						var result = [];
						var pacientes_consulta = [];
						var pacientes_examen = [];

						horas.forEach(function(hora){
							//cuento el numero de reservas regisstradas
							reservaCount += 1;

							if(hora.estado_reserva == "confirmado"){
							//cuento las confirmadass
							confirm += 1;
							switch(hora.tipo_reserva.tipo) {
										case "consulta médica":
												//cantidad de consultas
												// console.log("############encontre una consulta");
												consultaCount += 1;
												var objeto = {
													numero: consultaCount,
													nombre: hora.paciente_id.firstName + ' ' + hora.paciente_id.lastName,
													rut: hora.paciente_id.rut
												};
												pacientes_consulta.push(objeto);
												break;
										case "examen":
												//cantidad de xamenes
												examenCount +=1;

												var objeto = {
													numero: examenCount,
													nombre: hora.paciente_id.firstName + ' ' + hora.paciente_id.lastName,
													rut: hora.paciente_id.rut
												};


												pacientes_examen.push(objeto);
												// console.log("############encontre un examen");
												for(var j = 0; j < dist.length; j++){

															if (hora.tipo_reserva.descripcion.nombre == dist[j]) {
																examDimCount[j] +=1;
																examenConfSum +=1;
																break;
															};
												 };
												break;
										default:
												//
								};
							} else {
								//reservas rechazadas
								noConfirm += 1;
							};

						}); //foreach horas
						console.log(dist);
						console.log(examDimCount);
						var first = {
							reservas: reservaCount,
						 confirmadas : confirm,
						 perdidas: noConfirm,
						 consultas: consultaCount,
						 examenes : examenCount,
						 examDistCount: dist.length
						};
						result.push(first);

						function porcentaje(cant,total) {
							if (total == 0){
								return 0
							};
							var result = (cant * 100)/ total;
							return (Math.round( result * 10 ) / 10);
						};

						for (var i = 0; i < dist.length; i++) {

							var counts = {
								nombre: dist[i],
								cantidad: examDimCount[i],
								porcentaje: porcentaje(examDimCount[i], examenConfSum)
							};
							// examDistCount += 1;
							result.push(counts);
						};
						for (var i = 0; i < pacientes_consulta.length; i++) {
							result.push(pacientes_consulta[i]);

						}

						for (var i = 0; i < pacientes_examen.length; i++) {
							result.push(pacientes_examen[i]);

						}
						// result.push(pacientes_consulta);
						// result.push(pacientes_examen);

				// console.log(dist);
				// console.log(examDimCount);
				horas = result;
				// result.push(counts)
				console.log(result);
				res.json(horas);
				// res.json(horas);
			}); //examen disticnt
		  // horas = result;
			// // result.push(counts)
			// console.log(horas);
			// res.json(horas);
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
