angular.module('dashboard').controller('tipohora',['$scope','pacienteinfo',function ($scope,pacienteinfo) {

	$scope.paciente = pacienteinfo.paciente_nombre;
	$scope.seleccionado= function(){
		if(pacienteinfo.examen_id) pacienteinfo.examen_id=null;
		console.log(pacienteinfo)

	}
}
]
);
