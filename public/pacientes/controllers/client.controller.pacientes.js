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
            pacienteinfo.paciente_nombre = newPacienteData.firstName+" "+newPacienteData.lastName
            pacienteinfo.rut = newPacienteData.rut
            $location.path('/tipohora');
            //$location.path('/secretaria/pacientes/crear');
        }, function(reason) {
            Notifier.error(reason);
        });
    }
})



/* Crear el controller 'pacientes'
angular.module('pacientes').controller('PacientesController', ['$scope','SharedDataService', '$routeParams', '$location', 'PacientesResource', '$localStorage',
    function($scope,SharedDataService, $routeParams, $location, PacientesResource, $localStorage) {
        // Exponer el service Authentication
        // $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;

        $scope.PacienteData = SharedDataService;

//         // Crear un nuevo método controller para crear nuevos pacientes
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource paciente
            var paciente = new PacientesResource({
                run: this.PacienteData.rut,
                fono: this.fono
            });

            // Usar el método '$save' de paciente para enviar una petición POST apropiada
            paciente.$save(function(response) {
//                NuevoIngresoService.paciente = response;
                $scope.$storage.paciente = response;
                // Si un paciente fue creado de modo correcto, redireccionar al usuario a la página del paciente
                $location.path('/tipohora');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

      }
]);*/
