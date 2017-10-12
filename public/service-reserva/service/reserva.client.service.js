angular.module('service-reserva').factory('ReservaServicio',['$resource',
	function($resource){
		return $resource('/reservas/:fecha', {fecha:'@fecha'},{
			create: {method: "POST"},
			get: {
				isArray: true,
				method: "GET"}
		});


	}]);