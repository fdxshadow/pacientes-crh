angular.module('dashboard').controller('tipohora',['$scope','$localStorage',function ($scope,$localStorage) {
	$scope.$storage = $localStorage;
	$scope.paciente = $scope.$storage.paciente_nombre;
	$scope.seleccionado= function(){
		if($scope.$storage.examen_id) $scope.$storage.examen_id=null;
		console.log($scope.$storage)

	}
}
]
);
