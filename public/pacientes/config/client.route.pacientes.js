// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'pacientes'
angular.module('pacientes').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/pacientes/create', {
			templateUrl: 'pacientes/views/agregar.html',   //client.view.paciente.add.html'
			controller: 'PacientesController'
		})
		
	}
]);
