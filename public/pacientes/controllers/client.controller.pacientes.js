// Invocar modo JavaScript 'strict'
'use strict';


// clAuth saque
angular.module('pacientes').controller('PacientesController', function($scope, Paciente, Notifier, $location,  PacientesSrv, pacienteinfo) {

    $scope.agregar = function() {
        var newPacienteData = {
            rut: $scope.rut,
            firstName: $scope.fname,
            lastName: $scope.lname,
            telephone: $scope.telephone
        };


        PacientesSrv.createPaciente(newPacienteData).then(function() {
            Notifier.notify('Paciente Creado Exitosamente!');
            pacienteinfo.paciente_id = newPacienteData._id;
            pacienteinfo.paciente_nombre = newPacienteData.firstName+" "+newPacienteData.lastName;
            pacienteinfo.rut = newPacienteData.rut;
            $location.path('/tipohora');
        }, function(reason) {
            Notifier.error(reason);
        });
    };
});
