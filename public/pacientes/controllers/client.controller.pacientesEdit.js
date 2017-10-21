'use strict';

angular.module('pacientes').controller('PacientesControllerEdit', function($scope, Paciente, Notifier, $location,  PacientesSrv, pacienteinfo, $routeParams) {

    $scope.paciente = Paciente.get({_id:$routeParams._id});

    $scope.guardar = function() {
        console.log($scope.paciente);

        var updatedPacienteData = $scope.paciente.toJSON();

        PacientesSrv.actualizarPaciente(updatedPacienteData).then(function() {
            Notifier.notify('Paciente Editado Exitosamente!');
            $location.path('/hora');
        }, function(reason) {
            Notifier.error(reason);
        });
    }
});

