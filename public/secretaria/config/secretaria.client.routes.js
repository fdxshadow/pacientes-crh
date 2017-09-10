angular.module('secretaria').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'secretaria/views/secretaria.client.view.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);