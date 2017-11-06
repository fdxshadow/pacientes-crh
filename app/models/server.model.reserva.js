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
		type: String
	},
	hora_fin_reserva: {
		type: String
	},
	estado_reserva:{
		type: String,
        default: 'registrado',
        enum:['registrado', 'confirmado', 'rechazado']
	},
	fecha_reserva:{
		type: String
	}, 
	tipo_reserva:{
		tipo:{
			type: String,
			default: 'consulta médica',
			enum:['consulta médica', 'examen']},
			descripcion:{type:Schema.ObjectId,ref:'Examen'}		
	},
	bloqueo_reserva:{
		type: String,
        default: 'reserva',
        enum:['bloqueo', 'reserva' ]
	}
});

//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
ReservaSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

// Crear modelo 'User' a partir de 'UserSchema'
mongoose.model('Reserva', ReservaSchema);
