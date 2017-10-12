// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var HoraSchema = new Schema({

  fecha: {
    type: String,
    trim: true,
    default: ''
  },
  hora_inicio: {
    type: String,
    trim: true,
    default: ''
  },
  hora_final: {
    type: String,
    trim: true,
    default: ''
  },
  id_medico:{
    type: String,
    default: true
  },
  id_paciente:{
    type: Schema.ObjectId,
    ref: 'Paciente'
  },
});

mongoose.model('Hora', HoraSchema);
