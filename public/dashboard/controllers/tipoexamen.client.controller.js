
angular.module('dashboard').controller('tipoexamen',['$scope','$location', 'examenResource', 'exameninfo','servicemed','$localStorage',
function ($scope, $location, examenResource, exameninfo, servicemed, $localStorage) {
$scope.$storage = $localStorage;
	examenResource.query(function(data){
		$scope.examenes = data;
		console.log(data);
		if(data=="error getExamenes"){
			$scope.examenes = {};
		}
	});

		$scope.seleccionado = function(examen){
		console.log(examen);
		$scope.$storage.examen_id = examen._id;
		$scope.$storage.examen_nombre = examen.nombre;
		$scope.$storage.examen_disponibilidad = examen.horario;

		if(examen.personal == "médico"){
			$location.url('/medico');
		}
		else{
			$scope.$storage.medico_nombre = null;
			$location.url('/reservaPaciente');
		}
}

}]);
