// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var HorasSchema = new Schema({
	id_paciente: String,
	id_medico: String,
	fecha: Date,
	inicio:







});

mongoose.model('Horas', HorasSchema);	
