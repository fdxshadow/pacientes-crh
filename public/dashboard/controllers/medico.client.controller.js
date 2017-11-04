angular.module('dashboard').controller('medico',['$scope','pacienteinfo','servicemed', function ($scope,pacienteinfo,servicemed) {

	$scope.paciente = pacienteinfo.paciente_nombre;
	servicemed.query(function(data){
		$scope.medicos = data;


	});




    $scope.seleccionado = function (medico){
    	console.log(medico);
        pacienteinfo.medico_id=medico._id;
        pacienteinfo.medico_nombre = medico.nombre;
        pacienteinfo.medico_disponibilidad = medico.disponibilidad;
    }
 

}
]
);
