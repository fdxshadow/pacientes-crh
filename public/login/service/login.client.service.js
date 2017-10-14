angular.module('userServices',[])

.factory('User', function($http) {
	return {
        create: function(regData){
            return $http.post('/users',regData);
        }
	}
});