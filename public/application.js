var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,[
	'ngRoute',
	'ngResource',
	'ui.bootstrap',
	'ngStorage',
	'pacientes',
	'platanus.rut',
	'RutValidador',
	'service-example',
	'dashboard',
	'reservaPaciente',
	'720kb.datepicker',
	'medicos',
	'horas',
	'moment-picker',
	'agendas'
]);

mainApplicationModule.config(['$locationProvider',
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
]);

angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
});
