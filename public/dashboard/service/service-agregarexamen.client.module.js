// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'medicos'
angular.module('dashboard').factory('ExamenesResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' medico
    return $resource('create/examen/:examenId', {
        examenId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
