angular.module('dashboard').config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/dashboard',{
			templateUrl:'dashboard/views/index.html',
			authenticated: true
		}).
		when('/hora',{
			templateUrl:'dashboard/views/pedirhora.html',
			authenticated: true
		}).
		when('/tipohora',{
			templateUrl:'dashboard/views/tipohora.html',
			authenticated: true
		}).
		when('/examen',{
			templateUrl:'dashboard/views/tipoexamen.html',
			authenticated: true
		}).
		when('/medico',{
			templateUrl:'dashboard/views/medico.html',
			authenticated: true
		}).
		otherwise({
			redirectTo:'/'
		});
	}
]);
