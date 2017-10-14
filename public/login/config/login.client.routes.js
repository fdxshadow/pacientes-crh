var app = angular.module('routes',['ngRoute'])
.config(function($routeProvider,$locationProvider){

	$routeProvider

	.when('/',{
		templateUrl:'login/views/login.html',
		authenticated : false	
	})
	.when('/register',{
		templateUrl:'login/views/register.html',
		controller: 'regCtrl',
		controllerAs: 'register',
		authenticated : false
	})
	.when('/logout',{
		templateUrl:'login/views/logout.html',
		authenticated : false
	})
	.otherwise({
		redirectTo:'/'
	});

});
	
	
app.run(['$rootScope', 'Auth', '$location', 'User', function($rootScope, Auth, $location, User) {

    // Check each time route changes    
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
		if(next.$$route.authenticated == true){
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');

			}
		}else if(next.$$route.authenticated == false){
			if(Auth.isLoggedIn()){
				$location.path('/dashboard');
			}
		}
 
    });
	
}]);

