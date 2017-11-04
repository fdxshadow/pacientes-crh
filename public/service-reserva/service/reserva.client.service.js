angular.module('service-reserva').factory('ReservaServicio',['$resource',
	function($resource){
		return $resource('/reservas/:fecha/:medico/:examen', {fecha:'@fecha',medico:'@medico',examen:'@examen'},{
			create: {method: "POST"},
			get: {
				isArray: true,
				method: "GET"}
		});


	}]);