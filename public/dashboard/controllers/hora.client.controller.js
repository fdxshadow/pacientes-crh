angular.module('dashboard').controller('Hora',['$scope','$location','pacienteinfo', 'pacienteResource', function ($scope,$location,pacienteinfo, pacienteResource) {

	pacienteResource.query(function(data){
		$scope.pacientes = data;
		console.log(data);
		if(data=="error getPacientes"){
			$scope.pacientes = {};
		}
	});


	
	$scope.seleccionado = function(paciente){
		pacienteinfo.paciente_id = paciente._id;
		pacienteinfo.paciente_nombre = paciente.firstName+" "+paciente.lastName
		pacienteinfo.rut = paciente.rut
		console.log(pacienteinfo);
		$location.url('/tipohora'); //ruta de tu vista alfonso, la de los doctores

	}

	$scope.cambiofono = function(paciente){
		pacienteinfo.paciente = paciente.rut
		console.log(pacienteinfo.paciente);
		$location.url('/editarfono'); 

	}

/*    $scope.update = function(telephone) {
    // Usar el método '$update' de paciente para enviar una petición PUT apropiada
    $scope.paciente.$update(function() {
        // Si un paciente fue actualizado de modo correcto, redirigir el user a la página del paciente 
        $location.url('/hora');
    }, function(errorResponse) {
        // En otro caso, presenta al user un mensaje de error
        $scope.error = errorResponse.data.message;
    });
    $location.url('/hora');
};
*/
	$scope.actualizar = function(paciente){
		$scope.paciente = paciente;
	}	
	
}])