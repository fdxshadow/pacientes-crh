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
	'720kb.datepicker',
	'medicos',
	'agendas',
	'moment-picker'
]);

mainApplicationModule.config(['$locationProvider',
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
]);

mainApplicationModule.config(['momentPickerProvider', function (momentPickerProvider) {
        momentPickerProvider.options({
            /* ... */
						minutesStep: 30,
						hoursStart: 8,
						hoursEnd: 18,
						hoursFormat: "HH:[00]"
        });
    }]);

angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
});
