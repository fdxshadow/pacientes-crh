var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName,['ui.calendar','ngRoute','example','reservaSecretaria','reservaPaciente','service-example','720kb.datepicker']);

mainApplicationModule.config(['$locationProvider', 
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
]);

angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
});