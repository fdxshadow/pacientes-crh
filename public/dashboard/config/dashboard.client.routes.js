angular.module('dashboard').config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when('/dashboard',{
			templateUrl:'dashboard/views/index.html'
			//authenticated: true
		}).
		when('/hora',{
			templateUrl:'dashboard/views/pedirhora.html'
			//authenticated: true
		}).
		when('/tipohora',{
			templateUrl:'dashboard/views/tipohora.html'
			//authenticated: true
		}).
		when('/examen',{
			templateUrl:'dashboard/views/tipoexamen.html'
			//authenticated: true
		}).
		when('/medico',{
			templateUrl:'dashboard/views/medico.html'
			//authenticated: true
		}).
		when('/editarfono',{
			templateUrl:'dashboard/views/editarfono.html'
			//authenticated: true
		}).
		when('/hoy',{
			templateUrl:'dashboard/views/hoy.html'
			//authenticated: true

		}).
		when('/bloquear',{
			templateUrl:'dashboard/views/bloquear.html'
			//authenticated: true

		}).
		when('/examen/edit/:_id',{
      	templateUrl: 'dashboard/views/editarexamen.html',
      	controller: 'ExamenesControllerEdit',
      	//authenticated: true
    	}).
		when('/examen/create',{
		templateUrl:'dashboard/views/agregarexamen.html',
		controller: 'ExamenesController'
		//authenticated: true
		}).
    	otherwise({
    	redirectTo:'/'
		});
	}
]);
