angular.module('dashboard').controller('medico',['$scope','pacienteinfo',function ($scope,pacienteinfo) {

	$scope.seleccionado = function(numero){
		pacienteinfo.medico_id=numero
		console.log(pacienteinfo);

	}

}
]
);
