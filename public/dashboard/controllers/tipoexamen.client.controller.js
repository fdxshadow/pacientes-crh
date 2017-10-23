
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



		$scope.seleccionado = function(examen){
		exameninfo.examen_id = examen._id;
		exameninfo.examen_nombre = examen.nombre;
		console.log(examen);

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
