// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'horas'
angular.module('horas').factory('HorasResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' hora
    return $resource('api/horas/:horaId/:buscarFecha/:nombreMedico/:fecha', {
        horaId: '@_id',
        buscarFecha: '@buscarFecha',
    		nombreMedico: '@nombreMedico',
        fecha: '@fecha'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
