'use strict';
var mongoose = require('mongoose');
var Hora = mongoose.model('Hora');


exports.getHorario = function (req,res) {
	Hora.find({}).populate('paciente_id','firstName').populate('medico_id','nombre').
	exec(function(err,hora){
		if(err) res.send('error');
		res.json(hora);
	});
}