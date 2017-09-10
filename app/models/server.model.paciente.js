// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var PacienteSchema = new Schema({
  run: {
    type: String,
    trim: true,
    default: '',
    required: 'Debe ingresar RUN del paciente'
  },
  fono: {
    type: String,
    trim: true,
  
    default: ''
  }
});

mongoose.model('Paciente', PacienteSchema);
