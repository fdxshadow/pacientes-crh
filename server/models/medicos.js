'use strict';

var mongoose = require('mongoose');

var MedicoSchema = mongoose.Schema({
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
		match: [/.+\@.+\..+/, 'Ingrese una dirección de email válida'],
		default: 'emailmedico@gmail.com'
	}
});

var Medico = mongoose.model('Medico', MedicoSchema);

function createDefaultMedicos(){
    Medico.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Medico.create({
                run:'2654073-9',
                nombre: 'pedro gonzales',
                especialidad: 'espec 1',
                email: 'correoDoctor1@example.com'});
            Medico.create({
                run:'14943899-8',
                nombre: 'juan muñoz',
                especialidad: 'espec 2 ',
                email: 'correoDoctor2@example.com'});
            Medico.create({
                run:'15880543-K',
                nombre: 'diego rojas',
                especialidad: 'espec 3',
                email:'correoDoctor1@example.com'});
        }
    })
}

exports.createDefaultMedicos = createDefaultMedicos;
