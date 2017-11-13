'use strict'

var Medico = require('mongoose').model('Medico'),
rut = require('../utilities/rut');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido';
	}
};


exports.getMedicos = function (req, res) {
    Medico.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};
exports.create = function(req, res) {
	// Crear un nuevo objeto medico
	Medico.find({"run": req.body.run}).exec(function(err, collection) {
		if(collection.length > 0) {
				// err = new Error('RUT ya existe');
				res.status(400);
				return res.send({message:"Error: Médico con ese rut ya existe"});
		}else{



				// console.log(req.body);
				var testing = req.body.disponibilidad;
				if (testing.length == 0) {
					res.status(400);
					return res.send({message:"Error: El médico debe tener horario laboral"});
				}
				// console.log('sasdsdaasd');
				// console.log(testing[0].hora_inicio);
				var medico = new Medico(req.body);
			//
			 		for(var i = 0; i< testing.length;  i++) {

						if(testing[i].hora_inicio == 'Invalid date'){
							res.status(400);
							console.log('aye');
				      return res.send({message:"Error: Ingrese hora de inicio y fin para los dias seleccionados"});
						};
						if(testing[i].hora_termino == 'Invalid date'){
							res.status(400);
							console.log('aye');
				      return res.send({message:"Error: Ingrese hora de inicio y fin para los dias seleccionados"});
						};
				  };



			  if(!rut.isFormatValid(medico.run)){
			      res.status(400);
			      return res.send({message:"Error: Ingrese RUT sin puntos y con guión"})
			  } else if(!rut.isDigitValid(medico.run)){
			      res.status(400);
			      return res.send({message:"Error: Dígito Verificador incorrecto"})
			  }

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
	});

};

exports.medicoByID = function(req, res, next, id){
	Medico.findOne({
		_id: id
	}, function(err, medico){
		if (err) return next(err);
		if (!medico) return next(new Error('Fallo al cargar el medico ' + id));
		// Si un medico es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.medico = medico;
		// Llamar al siguiente middleware
		next();
	});
};

exports.read = function(req, res) {
	res.json(req.medico);
};

exports.update = function(req, res) {
	// Obtener el medico usando el objeto 'request'
	var medico = req.medico;

	var testing = req.body.disponibilidad;
	var testing = req.body.disponibilidad;
	if (testing.length == 0) {
		res.status(400);
		return res.send({message:"Error: El médico debe tener horario laboral"});
	}


	for(var i = 0; i< testing.length;  i++) {

		if(testing[i].hora_inicio == 'Invalid date'){
			res.status(400);
			console.log('aye');
			return res.send({message:"Error: Ingrese hora de inicio y fin para los dias seleccionados"});
		};
		if(testing[i].hora_termino == 'Invalid date'){
			res.status(400);
			console.log('aye');
			return res.send({message:"Error: Ingrese hora de inicio y fin para los dias seleccionados"});
		};
	};


	medico.run = req.body.run;
	if(!rut.isFormatValid(medico.run)){
			res.status(400);
			return res.send({message:"Error: Ingrese RUT sin puntos y con guión"})
	} else if(!rut.isDigitValid(medico.run)){
			res.status(400);
			return res.send({message:"Error: Dígito Verificador incorrecto"})
	}

	// Actualizar los campos medico
	// medico.run = req.body.run;
	medico.disponibilidad = req.body.disponibilidad;
	medico.nombre = req.body.nombre;
	medico.especialidad = req.body.especialidad;
	medico.email = req.body.email;

	// Intentar salvar el medico actualizado
	medico.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
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
