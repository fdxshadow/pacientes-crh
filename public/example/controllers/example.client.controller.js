angular.module('example').controller('ExampleController',['$scope','prueba',function ($scope,prueba) {
	$scope.name = prueba.mensaje;

}])