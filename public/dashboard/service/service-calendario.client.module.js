angular.module('dashboard').factory('Eventos',['$resource',function($resource) {
    return $resource('/horarios');
}]);