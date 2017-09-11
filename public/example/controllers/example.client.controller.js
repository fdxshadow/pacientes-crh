angular.module('example').controller('ExampleController',['$scope','SharedDataService',function ($scope,SharedDataService) {
	// $scope.name = prueba.mensaje;
	//  $scope.message = prueba.data.name + " tiene " + prueba.data.age;
 $scope.PacienteData = SharedDataService;
}]);
