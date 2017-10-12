var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,[
	'ngRoute',
	'ngResource',
	'ngAnimate',
	'ui.bootstrap',
	'ngStorage',
	'pacientes',
	'platanus.rut',
	'RutValidador',
	'service-example',
	'dashboard',
	'login',
	'service-reserva',
	'reservaPaciente',
	'720kb.datepicker'
]);

mainApplicationModule.config(['$locationProvider',
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
]);

angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
});
