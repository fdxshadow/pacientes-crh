// Invocar modo JavaScript 'strict'
'use strict';

angular.module('pacientes').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/pacientes/create', {
			templateUrl: 'pacientes/views/agregar.html',   
			controller: 'PacientesController',
			//authenticated: true
        }).
        when('/pacientes/edit/:_id', {
            templateUrl: 'pacientes/views/editar.html',
            controller: 'PacientesControllerEdit',
            //authenticated: true
        })
	}
]);
