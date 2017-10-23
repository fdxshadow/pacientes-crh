
angular.module('dashboard').controller('tipoexamen',['$scope','$location', 'examenResource', 'exameninfo', 'pacienteinfo','servicemed', function ($scope, $location, examenResource, exameninfo, pacienteinfo, servicemed) {

	examenResource.query(function(data){
		$scope.examenes = data;
		console.log(data);
		if(data=="error getExamenes"){
			$scope.examenes = {};
		}
	});
	
		servicemed.query(function(data){
		$scope.medicos = data;


	});

		/*$scope.seleccionado = function (medico){
    	console.log(medico);
        pacienteinfo.medico_id=medico._id;
        pacienteinfo.medico_nombre = medico.nombre;
    }*/


		$scope.seleccionado = function(examen){
		exameninfo.examen_id = examen._id;
		exameninfo.examen_nombre = examen.nombre;
		console.log(examen);
		//console.log(pacienteinfo);*/
		/*if(examen.nombre == "Ecografía"){
			$location.url('/medico');
		}
		else{
			$location.url('/reservaPaciente')
		}*/
		if(examen.nombre == "Ecografía"){
			console.log(examen.nombre)
			$location.url('/medico');
		}
		else{
			pacienteinfo.medico_nombre = null;
			$location.url('/reservaPaciente'); 
		}
}

}]);
