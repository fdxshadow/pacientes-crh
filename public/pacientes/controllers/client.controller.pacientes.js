// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'pacientes'
angular.module('pacientes').controller('PacientesController', ['$scope','SharedDataService', '$routeParams', '$location', 'PacientesResource', '$localStorage',
    function($scope,SharedDataService, $routeParams, $location, PacientesResource, $localStorage) {
        // Exponer el service Authentication
        // $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;

        $scope.PacienteData = SharedDataService;
        // $scope.Product.name = rutValido;


//
//         // metodo para seleccionar uno de los pacientes en el caso de uso agregar nuevo ingreso
//         $scope.setPaciente = function(index){
// //            NuevoIngresoService.paciente = $scope.pacientes[index];
//             $scope.$storage.paciente = $scope.pacientes[index];
//             $scope.buttonVisibility = true;
//         };
//
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
                $location.path('pacientes');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

      }
]);
