'use strict';
var mongoose = require('mongoose');
var Hora = mongoose.model('Hora');


exports.getHorario = function (req,res) {
	Hora.find({estado:'confirmado',estado:'registrado'}).populate('Paciente').populate('Medico').
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
}