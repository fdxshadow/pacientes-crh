// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'horas'
angular.module('horas').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/horas/createstep2', {
			templateUrl: 'horas/views/client.view.hora.add.html',
			controller: 'HorasController'
		}).
		when('/horas/createstep1', {
			templateUrl: 'pacientes/views/client.view.pacientes.html',
			controller: 'PacientesController'
		}).
		when('/horas', {
			templateUrl: 'horas/views/client.view.horas.html',
			controller: 'HorasController'
		});


	}
]);
