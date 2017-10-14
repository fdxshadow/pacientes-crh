'use strict';

angular.module('pacientes').controller('PacientesController', function($scope, Paciente, Notifier, $location,  PacientesSrv) {

    $scope.agregar = function() {
        var newPacienteData = {
            rut: $scope.rut,
            firstName: $scope.fname,
            lastName: $scope.lname,
            telephone: $scope.telephone
        };

        PacientesSrv.createPaciente(newPacienteData).then(function() {
            Notifier.notify('Paciente Creado Exitosamente!');
            $location.path('/tipohora');
        }, function(reason) {
            Notifier.error(reason);
        });
    }
});
