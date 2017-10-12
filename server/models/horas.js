'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

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


ReservaSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('Hora', ReservaSchema);