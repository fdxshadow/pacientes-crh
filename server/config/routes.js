'use strict';

var calendario = require('../controllers/calendario'),
    paciente = require('../controllers/paciente'),
    user = require('../controllers/user'),
    reserva = require('../controllers/reservas'),
    medico = require('../controllers/medico');;

module.exports = function (app) {

    app.get('/horarios', calendario.getHorario);

    app.post('/api/pacientes', paciente.create);
    app.get('/api/pacientes', paciente.getPacientes);
    app.get('/api/pacientes/:id', paciente.getPacientesById);
    app.get('/api/pacientenumero/:rut/:telfone', paciente.update);

    app.post('/users', user.createUser);
    app.post('/authenticate', user.authenticateUser);

    app.get('/reservas/:fecha', reserva.mostrar);
    app.get('/horario1', reserva.getHorario);
    app.post('/reservas', reserva.crear);
    app.get('/api/horas/:buscarFecha/:nombreMedico', reserva.listByFecha_Medico);
    app.param('buscarFecha', reserva.paramFecha);
    app.param('nombreMedico', reserva.paramMedico);

    app.get('/medicos', medico.getMedicos);
    app.get( '/api/medicos', medico.list)

    app.get('/', function(req, res) {
        if(req.session.lastVisit) {
            console.log(req.session.lastVisit);
        }
        req.session.lastVisit = new Date();
        res.render('index', {
            title: 'Sistema de pacientes'
        })
    });
};

/*



 */

