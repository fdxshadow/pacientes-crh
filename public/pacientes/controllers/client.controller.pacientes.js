(function() {
'use strict';
angular.module('pacientes').controller('PacientesController', function($scope, Paciente, Notifier, $location, PacientesSrv, $localStorage) {
    $scope.$storage = $localStorage;
    $scope.agregar = function() {
        var newPacienteData = new Paciente({
            rut: $scope.rut,
            firstName: $scope.fname,
            lastName: $scope.lname,
            telephone: $scope.telephone
        });
        PacientesSrv.funcionPaciente(newPacienteData, newPacienteData.$save()).then(function() {
            Notifier.notify('Paciente Creado Exitosamente!');
            $scope.$storage.paciente_id = newPacienteData._id;
            $scope.$storage.paciente_nombre = newPacienteData.firstName + " " + newPacienteData.lastName;
            $scope.$storage.rut = newPacienteData.rut;
            $location.path('/tipohora');
        }, function(reason) {
            Notifier.error(reason);
        });
    };
});
})();
