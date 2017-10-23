angular.module('reservaPaciente').config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/reservaPaciente',{
			templateUrl:'reservaPaciente/views/reservaPaciente.client.view.html',
			authenticated: true
		}).
		otherwise({
			redirectTo:'/'
		});
	}
]);