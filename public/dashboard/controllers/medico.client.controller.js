angular.module('dashboard').controller('medico',['$scope','pacienteinfo','servicemed',function ($scope,pacienteinfo,servicemed) {


	servicemed.query(function(data){
		$scope.medicos = data;

	});




    $scope.seleccionado = function (medico){
        pacienteinfo.medico_id=medico.id;
    }

}
]
);
