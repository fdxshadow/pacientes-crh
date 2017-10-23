// Invocar modo JavaScript 'strict'
'use strict';

angular.module('pacientes').service('PacientesSrv', function ($q, Paciente, Rut) {

    this.createPaciente = function (newPacienteData) {

        var newPaciente = new Paciente(newPacienteData);
        var dfd = $q.defer();

        if (!Rut.isFormatValid(newPacienteData.rut)) {
            dfd.reject("Error: Ingrese RUT sin puntos y con guión");
            return dfd.promise;
        }
        else if (!Rut.isDigitValid(newPacienteData.rut)) {
            dfd.reject("Dígito Verificador incorrecto");
            return dfd.promise;
        }

        newPaciente.$save().then(function () {
            dfd.resolve();
        }, function (response) {
            dfd.reject(response.data.reason);
        });

        return dfd.promise;
    }
});

/* Crear el service 'pacientes
angular.module('pacientes').factory('PacientesResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
    return $resource('api/pacientes/:pacienteId', {
        pacienteId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

*/