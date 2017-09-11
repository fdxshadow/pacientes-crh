// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'pacientes'
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