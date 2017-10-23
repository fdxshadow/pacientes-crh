angular.module('dashboard').controller('fono',['$scope','pacienteinfo', 'pacientenumero', function ($scope, pacienteinfo, pacientenumero) {

$scope.actualizar = function(){
    var paciente = {
        rut:pacienteinfo.paciente,
        telephone:$scope.numero
    }

    pacientenumero.get({rut:pacienteinfo.paciente,telfone:$scope.numero},function(data){
        $location.url('/hora');

    });


}


}]);