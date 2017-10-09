angular.module('dashboard').controller('tipoexamen',['$scope',function ($scope) {
	$scope.examenes = [
		{nombre: "Espermiograma", horario: "8 a 12 hrs y 14 a 17 hrs"},
		{nombre: "Separación espermática",  horario: "8 a 12 hrs y 14 a 17 hrs"},
		{nombre: "Fragmentación del DNA",  horario: "8 a 12 hrs y 14 a 17 hrs"},
		{nombre: "Ecografía",  horario: "7 a 13 hrs"},
		{nombre: "Inseminación intra uterina",  horario: "8 a 12 hrs y 14 a 17 hrs"},
		{nombre: "Criopreservación espermática",  horario: "8 a 12 hrs y 14 a 17 hrs"}
	]
}]);
