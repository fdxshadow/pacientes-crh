//Crear el service 'examenes'
angular.module('dashboard').factory('examenResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' examenes


	return $resource('/examenes');
	

    
}]);