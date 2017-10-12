

var mongoose = require('mongoose'),
    pacienteModel = require('../models/paciente'),
    userModel = require('../models/user'),
    reservaModel = require('../models/reserva'),
    horasModel = require('../models/horas'),
    medicoModel = require('../models/medicos');


module.exports = function(config){
    mongoose.connect(config.db,{useMongoClient: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){console.log('conectado a db pacientes-crh ')});

    pacienteModel.createDefaultPacientes();

};
