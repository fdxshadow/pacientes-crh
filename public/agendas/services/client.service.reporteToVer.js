// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'agendas'
angular.module('agendas').factory('AgendasResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' agenda
    return $resource('api/agendas/:agendaId/:buscarFecha/:nombreMedico/:fecha', {
        agendaId: '@_id',
        buscarFecha: '@buscarFecha',
        nombreMedico: '@nombreMedico',
        fecha: '@fecha'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
