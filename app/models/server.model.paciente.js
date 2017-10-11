var mongoose = require('mongoose'),
    rut = require('../utilities/rut');

var PacienteSchema = mongoose.Schema({
    rut: {type: String, required:'RUT es necesario', unique:true },
    firstName: {type: String, required:'Nombre(s) es necesario'},
    lastName: {type: String, required:'Apellido(s) es necesario'},
    telephone: {type: String, required:'Telefono es necesario'},
});

PacienteSchema.path('rut').validate(function(v) {
    return rut.isFormatValid(v);
}, 'Ingrese sin puntos y con guión');

PacienteSchema.path('rut').validate(function(v) {
    return rut.isDigitValid(v);
}, 'Dígito Verificador incorrecto');

var Paciente = mongoose.model('Paciente', PacienteSchema);


function createDefaultPacientes(){
    Paciente.find({}).exec(function(err, collection) {

        console.log('Holaaaaaaaa');
        if(collection.length === 0) {
            Paciente.create({rut:'1-9',firstName: 'john', lastName: 'doe', telephone:"+56 9 841 000 000"});
            Paciente.create({rut:'15095162-3',firstName: 'claudio', lastName: 'araya', telephone:"+56 9 841 0322 000"});
            Paciente.create({rut:'15751100-9',firstName: 'katherine', lastName: 'loayza', telephone:"+56 9 841 000 000"});
        }
    })
}

exports.createDefaultPacientes = createDefaultPacientes;

// Invocar al modo JavaScript 'strict'
/*
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
    required: 'Debe ingresar RUN del paciente',
    unique: true
  },
  fono: {
    type: String,
    trim: true,

    default: ''
  }
});

mongoose.model('Paciente', PacienteSchema);
*/