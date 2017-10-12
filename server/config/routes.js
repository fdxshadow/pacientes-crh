'use strict';

var calendario = require('../controllers/calendario'),
    paciente = require('../controllers/paciente'),
    user = require('../controllers/user'),
    reserva = require('../../app/controllers/server.controller.reservas');


module.exports = function (app) {

    app.get('/horarios', calendario.getHorario);

    app.post('/api/pacientes', paciente.create);
    app.get('/api/pacientes', paciente.getPacientes);
    app.get('/api/pacientes/:id', paciente.getPacientesById);
    app.get('/api/pacientenumero/:rut/:telfone', paciente.update);

    app.post('/users', user.createUser);
    app.post('/authenticate', user.authenticateUser);

    app.route('/reservas/:fecha').get(reserva.mostrar);
    app.route('/horario1').get(reserva.getHorario);
    app.route('/reservas').post(reserva.crear);

    app.route('/api/horas/:buscarFecha/:nombreMedico')
        .get(reserva.listByFecha_Medico);
    app.param('buscarFecha', reserva.paramFecha);
    app.param('nombreMedico', reserva.paramMedico);





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


//console.info('hola');
module.exports = function (app) {


}




* */

