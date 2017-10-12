// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'pacientes'
angular.module('pacientes').controller('PacientesController', ['$scope','SharedDataService', '$routeParams', '$location', 'PacientesResource', '$localStorage',
    function($scope,SharedDataService, $routeParams, $location, PacientesResource, $localStorage) {
        // Exponer el service Authentication
        // $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;


        $scope.sharedData = SharedDataService;

        // metodo para seleccionar uno de los pacientes en el caso de uso agregar nuevo ingreso
        $scope.setPaciente = function(index){
//            NuevoIngresoService.paciente = $scope.pacientes[index];
            $scope.$storage.pacienteSelec = $scope.pacientes[index];
            $scope.buttonVisibility = true;
        };

        $scope.find = function() {
            // Usar el método 'query' de paciente para enviar una petición GET apropiada
            $scope.pacientes = PacientesResource.query();
        };

//         // Crear un nuevo método controller para crear nuevos pacientes
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource paciente
            var paciente = new PacientesResource({
                run: this.rut,
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

        $scope.findOne = function(_pacienteid) {
            // Usar el método 'get' de factura para enviar una petición GET apropiada
            $scope.pacientenocreo = PacientesResource.get({
                // medicoId: $routeParams.facturaId
                pacienteId: _pacienteid
            });
        };

      }
]);
