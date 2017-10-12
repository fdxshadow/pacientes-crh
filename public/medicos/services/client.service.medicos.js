// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'medicos'
angular.module('medicos').factory('MedicosResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' medico
    return $resource('api/medicos/:medicoId', {
        medicoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
