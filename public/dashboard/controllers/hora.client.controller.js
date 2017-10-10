angular.module('dashboard').controller('Hora',['$scope','$location','pacienteinfo',function ($scope,$location,pacienteinfo) {
	$scope.pacientes = [
		{rut:'18988430',
		 telefono:'555555'	
			},
		{rut:'18988710',
		 telefono:'555555'},
		{rut:'18229444',
		 telefono:'5555555'},
		{rut:'10813411',
		telefono:'555555'}
	];		

	$scope.seleccionado = function(paciente){
		console.log(pacienteinfo);
		pacienteinfo.paciente_id=paciente.rut;
		console.log(pacienteinfo);
		$location.url('/tipohora'); //ruta de tu vista alfonso, la de los doctores

	}

	$scope.actualizar = function(paciente){
		$scope.paciente = paciente;
	}	
}])