// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'agendas'
angular.module('agendas').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/agendas', {
			templateUrl: 'agendas/views/client.view.agenda.menu.html',
			controller: 'AgendasController'
		}).
		when('/agendas/ver', {
			templateUrl: 'agendas/views/client.view.agenda.ver.html',
			controller: 'HorasController'
		})

	}
]);