angular.module('dashboard').factory('pacientenumero',['$resource',
	function($resource){

		return $resource('/api/pacientenumero/:rut/:telfono',{rut:'@rut',telfono:'@telfono'});

	}]);
