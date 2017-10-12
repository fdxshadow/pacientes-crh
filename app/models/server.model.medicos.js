// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var MedicoSchema = new Schema({
  run: {
    type: String
  },
  nombre: {
    type: String
  },
  especialidad: {
    type: String,
    trim: true,
    default: 'Especialidad inVitro'
  },
  email: {
		type: String,
		// validar formato email
		match: [/.+\@.+\..+/, 'Ingrese una dirección de email válida'],
		default: 'emailmedico@gmail.com'
	}

});

mongoose.model('Medico', MedicoSchema);
