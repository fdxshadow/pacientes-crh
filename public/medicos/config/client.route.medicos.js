// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'medicos'
angular.module('medicos').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/medicos/create', {
			templateUrl: 'medicos/views/client.view.medico.add.html',
			controller: 'MedicosController'
		}).
		when('/medicos', {
			templateUrl: 'medicos/views/client.view.medicos.html',
			controller: 'MedicosController'
		}).
		when('/medicos/edit', {
			templateUrl: 'medicos/views/client.view.medico.edit.html',
			controller: 'MedicosController'
		});

	}
]);
