
angular.module('dashboard').controller('tipoexamen',['$scope','$location', 'examenResource', 'exameninfo', 'pacienteinfo','servicemed', function ($scope, $location, examenResource, exameninfo, pacienteinfo, servicemed) {

	examenResource.query(function(data){
		$scope.examenes = data;
		console.log(data);
		if(data=="error getExamenes"){
			$scope.examenes = {};
		}
	});
	
		$scope.seleccionado = function(examen){
		pacienteinfo.examen_id = examen._id;
		pacienteinfo.examen_nombre = examen.nombre;
		if(examen.personal == "médico"){
			$location.url('/medico');
		}
		else{
			pacienteinfo.medico_nombre = null;
			$location.url('/reservaPaciente'); 
		}
}

}]);
