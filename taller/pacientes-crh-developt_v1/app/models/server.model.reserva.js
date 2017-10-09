// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

// Definir un nuevo Schema llamado 'UserSchema'
var ReservaSchema = new Schema({
	paciente_id: {
		type: String
	},
	medico_id: {
		type: String
	},
	hora_inicio_reserva: {
		type: Date
	},
	hora_fin_reserva: {
		type: Date
	},
	estado_reserva:{
		type: String,
        default: 'registrado',
        enum:['registrado', 'confirmado', 'rechazado']
	},
	fecha_reserva:{
		type: Date
	},
	created:{
		type: Date,
		default: Date.now
	},
});

//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
ReservaSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

// Crear modelo 'User' a partir de 'UserSchema'
mongoose.model('Reserva', ReservaSchema);
