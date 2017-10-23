// Invocar al modo JavaScript 'strict'
// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Definir un nuevo Schema llamado 'UserSchema'
var ReservaSchema = new Schema({
	paciente_id: {
		type: Schema.ObjectId,
		ref: 'Paciente'
	},
	medico_id: {
		type: Schema.ObjectId,
		ref: 'Medico'
	},
	hora_inicio_reserva: {
		type: Date
	},
	hora_fin_reserva: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	estado_reserva: {
		type: String
	}
});




//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
ReservaSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

// Crear modelo 'User' a partir de 'UserSchema'
mongoose.model('Hora', ReservaSchema);