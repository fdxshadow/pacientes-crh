angular.module('dashboard').controller('medico',['$scope','servicemed','$localStorage', function ($scope,servicemed, $localStorage) {
	$scope.$storage = $localStorage;
	$scope.paciente = $scope.$storage.paciente_nombre;
	servicemed.query(function(data){
		$scope.medicos = data;


	});




    $scope.seleccionado = function (medico){
    	console.log(medico);
        $scope.$storage.medico_id=medico._id;
        $scope.$storage.medico_nombre = medico.nombre;
        $scope.$storage.medico_disponibilidad = medico.disponibilidad;
    }


}
]
);
