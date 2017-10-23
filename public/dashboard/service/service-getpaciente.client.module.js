//Crear el service 'pacientes'
angular.module('dashboard').factory('pacienteResource', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' paciente
	///api/pacientes

	return $resource('/api/pacientes');
	

    
}]);