angular.module('dashboard').controller('fono',['$scope', 'pacientenumero','$localStorage', function ($scope, $localStorage, pacientenumero) {
  $scope.$storage = $localStorage;
$scope.actualizar = function(){
    var paciente = {
        rut:$scope.$storage.paciente,
        telephone:$scope.numero
    }

    pacientenumero.get({rut:$scope.$storage.paciente,telfone:$scope.numero},function(data){
        $location.url('/hora');

    });


}


}]);
