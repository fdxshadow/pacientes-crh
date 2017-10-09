angular.module('service-reserva').factory('ReservaServicio',['$resource',
	function($resource){
		
//console.log($resource('/personas'));
		return $resource('/reservas', {},{
			create: {method: "POST"},
			get: {
				isArray: true,
				method: "GET"}
		});


	}]);