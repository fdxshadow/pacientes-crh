angular.module('dashboard').controller('tipohora',['$scope','pacienteinfo',function ($scope,pacienteinfo) {


	$scope.seleccionado= function(){
		if(pacienteinfo.examen_id) pacienteinfo.examen_id=null;
		console.log(pacienteinfo)

	}
}
]
);
