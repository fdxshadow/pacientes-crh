// Invocar al modo JavaScript 'strict'
'use strict';

// cargar modelo 'User' desde mongoDB
var reserva = require('mongoose').model('Reserva');

exports.mostrar = function(req,res){
	console.log(req.params);
	var fecha = req.params.fecha;
	if(req.params.medico && req.params.examen && req.params.medico != "no"){
		reserva.find({fecha_reserva:fecha,medico_id:req.params.medico,"tipo_reserva.descripcion":req.params.examen}).exec(
			function(error,reservas){
				if (error) return res.send(error);
				console.log("ecografia")
				return res.json(reservas);
			});
	}else 
		if (req.params.medico && req.params.medico != "no") {
			reserva.find({fecha_reserva:fecha,medico_id:req.params.medico}).exec(function(error,reservas){
				if (error) return res.send(error);
				console.log("consulta medica");
				return res.json(reservas);
			})
		}
		else
			if (req.params.examen) {
				reserva.find({fecha_reserva:fecha,"tipo_reserva.descripcion":req.params.examen}).exec(
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
		 medico_id: req.id_medico
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
	 }).populate('tipo_reserva.descripcion','nombre').exec(function(err, horas){
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
			var noConfirm = 0;
			var confirm = 0;
			var consultaCount = 0;
			var examenCount = 0;
			var ecoCount = 0;
			var insiCount =0;
			var fecuCount =0;
			var esperCount = 0;
			var fragCount = 0;
			var crioOvoCount =0;
			var	crioEsperCount =0;
			var ovodoCount =0;
			var donaCount = 0;


			// enum:['consulta médica', 'examen']
			// var confCount = 0;
			// var
			horas.forEach(function(hora){
				//cuento el numero de reservas regisstradas
				reservaCount += 1;

				if(hora.estado_reserva == "confirmado"){
					//cuento las confirmadass
					confirm += 1;
					switch(hora.tipo_reserva.tipo) {
								case "consulta médica":
							 			//cantidad de consultas
										console.log("############encontre una consulta");
										consultaCount += 1;
										break;
								case "examen":
										//cantidad de xamenes
										examenCount +=1;
										console.log("############encontre un examen");
										switch (hora.tipo_reserva.descripcion.nombre) {
											case "Ecografía":
												ecoCount +=1;
												break;
											case "Insiminación intrauterina":
												insiCount +=1;
												break;
											case "Fecundación in vitro":
												fecuCount +=1;
												break;
											case "Espermiograma":
												esperCount +=1;
												break;
											case "Fragmentación del DNA":
												fragCount +=1
												break;
											case "Criopreservación de ovocitos":
												crioOvoCount +=1;
												break;
											case "Criopreservación espermática":
												crioEsperCount +=1;
												break;
											case "Ovodonación":
												ovodoCount +=1;
												break;
											case "Donación de semen":
												donaCount +=1;
												break;
											default:
												//
										};

										break;
								default:
										//
						};

				}else {
					//reservas rechazadas
					noConfirm += 1;
				};


				    // console.log(hora.estado_reserva);
				    // Do whatever processing you want
				});
				console.log('consultas: ' + consultaCount);
				console.log('examens : ' + examenCount);

				// console.log(hora.estado_reserva);
				var counts = {
				    reservas: reservaCount,
						confirmadas : confirm,
						perdidas: noConfirm,
				    consultas: consultaCount,
						examenes : examenCount,
						ecografias: ecoCount,
						insiminaciones: insiCount,
						fecundaciones: fecuCount,
						espermiogramas: esperCount,
						fragmenntaciones: fragCount,
						crioOvocitos : crioOvoCount,
						crioEsperma : crioEsperCount,
						ovodonaciones : ovodoCount,
						donacionesSemen : donaCount
				};
				var result = [];
				result.push(counts);
				// var horas = JSON.stringify({datos});
				horas = result;
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
