// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'medicos'
angular.module('medicos').controller('MedicosController', ['$scope','SharedDataService', '$routeParams', '$location', 'MedicosResource', '$localStorage',
    function($scope,SharedDataService, $routeParams, $location, MedicosResource, $localStorage) {
        // Exponer el service Authentication
        // $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;
        $scope.test1 = $scope.$storage.medicoinforme;


        $scope.PacienteData = SharedDataService;


        var aux = [];
        var dia = new Array();


//         // Crear un nuevo método controller para crear nuevos medicos
        $scope.create = function() {
            if($scope.dias.lunes){
                 dia = {
                    dia:"lunes",
                    hora_inicio:$scope.hora_inicio_lunes,
                    hora_termino:$scope.hora_termino_lunes
                };
                aux.push(dia);
            }
            if($scope.dias.martes){
                 dia = {
                    dia:"martes",
                    hora_inicio:$scope.hora_inicio_martes,
                    hora_termino:$scope.hora_termino_martes
                };
                aux.push(dia);
            }
            if($scope.dias.miercoles){
                 dia = {
                    dia:"miercoles",
                    hora_inicio:$scope.hora_inicio_miercoles,
                    hora_termino:$scope.hora_termino_miercoles
                };
                aux.push(dia);
            }
            if($scope.dias.jueves){
                 dia = {
                    dia:"jueves",
                    hora_inicio:$scope.hora_inicio_jueves,
                    hora_termino:$scope.hora_termino_jueves
                };
                aux.push(dia);
            }
            if($scope.dias.viernes){
                 dia = {
                    dia:"viernes",
                    hora_inicio:$scope.hora_inicio_viernes,
                    hora_termino:$scope.hora_termino_viernes
                };
                aux.push(dia);
            }
            
            console.log(aux);
            

            var medico = new MedicosResource({
                run: this.run,
                nombre: this.nombre,
                especialidad: this.especialidad,
                email: this.email,
                disponibilidad:aux
            });

            console.log(medico);

            // Usar el método '$save' de medico para enviar una petición POST apropiada
            medico.$save(function(response) {
//                NuevoIngresoService.medico = response;
                $scope.$storage.medico = response;
                // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico
                $location.path('/tipohora');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.setMedico = function(index){
            $scope.$storage.medicoTest = $scope.medicos[index];
            // $scope.buttonVisibility = true;
        };

        $scope.find = function() {
            // Usar el método 'query' de paciente para enviar una petición GET apropiada
            $scope.medicos = MedicosResource.query();
        };

        $scope.findOne = function() {
            // Usar el método 'get' de factura para enviar una petición GET apropiada
            $scope.mediconocreo = MedicosResource.get({
                // medicoId: $routeParams.facturaId
                medicoId: $scope.$storage.medicoAgenda._id
            });
        };

      }
]);
