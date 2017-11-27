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
		when('/reportes', {
			templateUrl: 'agendas/views/client.view.reporte.menu.html',
			controller: 'AgendasController'
		}).
		when('/reportes/ver', {
			templateUrl: 'agendas/views/client.view.reporte.ver.html',
			controller: 'ReportesControllerPdf'
		}).
		when('/agendas/ver', {
			templateUrl: 'agendas/views/client.view.agenda.ver.html',
			controller: 'AgendasControllerPdf'
		}).
		when('/agendas/general', {
			templateUrl: 'agendas/views/client.view.agenda.general.html'
		})

	}
]);
