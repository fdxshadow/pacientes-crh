// Invocar modo JavaScript 'strict'
'use strict';

angular.module('pacientes').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/pacientes/create', {
			templateUrl: 'pacientes/views/agregar.html',   
			controller: 'PacientesController',
			//authenticated: true
		})
		
	}
]);
