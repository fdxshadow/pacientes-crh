angular.module('dashboard').factory('servicemed',['$resource',function($resource) {

    return $resource('/medicos');
}]);