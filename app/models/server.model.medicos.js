'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Definir un nuevo Schema llamado 'UserSchema'
var MedicosSchema = new Schema({
	nombre:String,
	run:String
});



mongoose.model('Medico',MedicosSchema);

