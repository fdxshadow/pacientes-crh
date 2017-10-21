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

        if(collection.length === 0) {
            Paciente.create({rut:'1-9',firstName: 'john', lastName: 'doe', telephone:"987654321"});
            Paciente.create({rut:'15095162-3',firstName: 'claudio', lastName: 'araya', telephone:"987654321"});
            Paciente.create({rut:'15751100-9',firstName: 'katherine', lastName: 'loayza', telephone:"123456789"});
        }
    })
}

exports.createDefaultPacientes = createDefaultPacientes;
